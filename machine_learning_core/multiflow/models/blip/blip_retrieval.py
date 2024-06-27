import torch
from torch import nn
import torch.nn.functional as F

from models.blip.med import BertConfig, BertModel
from models.blip.blip_captioning import create_vit, init_tokenizer, load_checkpoint

from utils.prune_utils import inherit_encoder_momentum_masks


class BLIPRetrieval(nn.Module):
    def __init__(self,                 
                 med_config = 'configs/blip/med_config.json',  
                 image_size = 384,
                 vit = 'base',
                 vit_grad_ckpt = False,
                 vit_ckpt_layer = 0,                      
                 embed_dim = 256,     
                 queue_size = 57600,
                 momentum = 0.995,
                 negative_all_rank = False,
                 ):
        """
        Args:
            med_config (str): path for the mixture of encoder-decoder model's configuration file
            image_size (int): input image size
            vit (str): model size of vision transformer
        """               
        super().__init__()
        
        self.visual_encoder, vision_width = create_vit(vit,image_size, vit_grad_ckpt, vit_ckpt_layer)
        self.tokenizer = init_tokenizer()   
        med_config = BertConfig.from_json_file(med_config)
        med_config.encoder_width = vision_width
        self.text_encoder = BertModel(config=med_config, add_pooling_layer=False)          

        text_width = self.text_encoder.config.hidden_size
        
        self.vision_proj = nn.Linear(vision_width, embed_dim)
        self.text_proj = nn.Linear(text_width, embed_dim)

        self.itm_head = nn.Linear(text_width, 2) 
        
        # create momentum encoders  
        self.visual_encoder_m, vision_width = create_vit(vit, image_size)              
        self.vision_proj_m = nn.Linear(vision_width, embed_dim)
        self.text_encoder_m = BertModel(config=med_config, add_pooling_layer=False)    
        self.text_proj_m = nn.Linear(text_width, embed_dim)
        
        self.model_pairs = [["visual_encoder", self.visual_encoder, self.visual_encoder_m],
                            ["vision_proj", self.vision_proj, self.vision_proj_m],
                            ["text_encoder", self.text_encoder, self.text_encoder_m],
                            ["text_proj", self.text_proj, self.text_proj_m],
                           ]       
        self.copy_params()

        # create the queue
        self.register_buffer("image_queue", torch.randn(embed_dim, queue_size))
        self.register_buffer("text_queue", torch.randn(embed_dim, queue_size))
        self.register_buffer("idx_queue", torch.full((1,queue_size),-100))
        self.register_buffer("ptr_queue", torch.zeros(1, dtype=torch.long))  

        self.image_queue = nn.functional.normalize(self.image_queue, dim=0)
        self.text_queue = nn.functional.normalize(self.text_queue, dim=0)
        
        self.queue_size = queue_size
        self.momentum = momentum
        self.temp = nn.Parameter(0.07*torch.ones([]))   
        
        self.negative_all_rank = negative_all_rank


    @torch.no_grad()
    def update_momentum(self, visual_encoder_m, text_encoder_m, vision_proj_m, text_proj_m):
        visual_encoder_m = self._external_momentum_update("visual_encoder", visual_encoder_m)
        text_encoder_m = self._external_momentum_update("text_encoder", text_encoder_m)
        vision_proj_m = self._external_momentum_update("vision_proj", vision_proj_m)
        text_proj_m = self._external_momentum_update("text_proj", text_proj_m)
        return visual_encoder_m, text_encoder_m, vision_proj_m, text_proj_m


    def forward(self, image, text_ids, text_atts, alpha, idx, visual_encoder_m, text_encoder_m, vision_proj_m, text_proj_m, **kwargs):
        with torch.no_grad():
            self.temp.clamp_(0.001, 0.5)

        # print("forwarding image encoder")
        image_embeds = self.visual_encoder(image) 
        image_atts = torch.ones(image_embeds.size()[:-1],dtype=torch.long).to(image.device)        
        image_feat = F.normalize(self.vision_proj(image_embeds[:,0,:]),dim=-1)    
        
        # print("forwarding text encoder")
        text_output = self.text_encoder(text_ids, attention_mask = text_atts,                      
                                        return_dict = True, mode = 'text')            
        text_feat = F.normalize(self.text_proj(text_output.last_hidden_state[:,0,:]),dim=-1)        
        
        ###============== Image-text Contrastive Learning ===================###
        idx = idx.view(-1,1)
        idx_all = torch.cat([idx.t(), self.idx_queue.clone().detach()],dim=1)  
        pos_idx = torch.eq(idx, idx_all).float()       
        sim_targets = pos_idx / pos_idx.sum(1,keepdim=True)   
        
        # get momentum features
        with torch.no_grad():
            # print("updating momentum")
            # self._momentum_update()

            # print("forwarding momentum image encoder")
            image_embeds_m = visual_encoder_m(image) 
            image_feat_m = F.normalize(vision_proj_m(image_embeds_m[:,0,:]),dim=-1)  
            image_feat_m_all = torch.cat([image_feat_m.t(), self.image_queue.clone().detach()],dim=1)                   
            
            # print("forwarding momentum text encoder")
            text_output_m = text_encoder_m(text_ids, attention_mask = text_atts,                      
                                            return_dict = True, mode = 'text')    
            text_feat_m = F.normalize(text_proj_m(text_output_m.last_hidden_state[:,0,:]),dim=-1) 
            text_feat_m_all = torch.cat([text_feat_m.t(), self.text_queue.clone().detach()],dim=1)

            sim_i2t_m = image_feat_m @ text_feat_m_all / self.temp  
            sim_t2i_m = text_feat_m @ image_feat_m_all / self.temp   

            sim_i2t_targets = alpha * F.softmax(sim_i2t_m, dim=1) + (1 - alpha) * sim_targets
            sim_t2i_targets = alpha * F.softmax(sim_t2i_m, dim=1) + (1 - alpha) * sim_targets        


        sim_i2t = image_feat @ text_feat_m_all / self.temp 
        sim_t2i = text_feat @ image_feat_m_all / self.temp 
                             
        loss_i2t = -torch.sum(F.log_softmax(sim_i2t, dim=1)*sim_i2t_targets,dim=1).mean()
        loss_t2i = -torch.sum(F.log_softmax(sim_t2i, dim=1)*sim_t2i_targets,dim=1).mean() 

        loss_itc = (loss_i2t+loss_t2i)/2
        
        # print("running all gather")
        idxs = concat_all_gather(idx)
        
        # print("dequeue and enqueue")
        self._dequeue_and_enqueue(image_feat_m, text_feat_m, idxs)        

        ###============== Image-text Matching ===================###
        encoder_input_ids = text_ids.clone()
        encoder_input_ids[:,0] = self.tokenizer.enc_token_id

        # forward the positve image-text pair
        bs = image.size(0)
        # print("forwarding positive image-text pair")
        output_pos = self.text_encoder(encoder_input_ids,
                                       attention_mask = text_atts,
                                       encoder_hidden_states = image_embeds,
                                       encoder_attention_mask = image_atts,      
                                       return_dict = True,
                                      )  
        
        # print("forwarding negative image-text pair")
        with torch.no_grad():                
            mask = torch.eq(idx, idx.t())
            
            sim_i2t = image_feat @ text_feat.t() / self.temp 
            sim_t2i = text_feat @ image_feat.t() / self.temp 

            weights_i2t = F.softmax(sim_i2t,dim=1)
            weights_i2t.masked_fill_(mask, 0)            

            weights_t2i = F.softmax(sim_t2i,dim=1)
            weights_t2i.masked_fill_(mask, 0)     

        # select a negative image (from same rank) for each text
        image_embeds_neg = []    
        for b in range(bs):
            neg_idx = torch.multinomial(weights_t2i[b], 1).item()
            image_embeds_neg.append(image_embeds[neg_idx])
        image_embeds_neg = torch.stack(image_embeds_neg, dim=0)   

        # select a negative text (from same rank) for each image    
        text_ids_neg = []
        text_atts_neg = []
        for b in range(bs):
            neg_idx = torch.multinomial(weights_i2t[b], 1).item()
            text_ids_neg.append(encoder_input_ids[neg_idx])
            text_atts_neg.append(text_atts[neg_idx])            
            
        text_ids_neg = torch.stack(text_ids_neg,dim=0)   
        text_atts_neg = torch.stack(text_atts_neg,dim=0)      

        text_ids_all = torch.cat([encoder_input_ids, text_ids_neg],dim=0)     
        text_atts_all = torch.cat([text_atts, text_atts_neg],dim=0)     

        image_embeds_all = torch.cat([image_embeds_neg,image_embeds], dim=0)
        image_atts_all = torch.cat([image_atts,image_atts], dim=0)

        output_neg = self.text_encoder(text_ids_all,
                                       attention_mask = text_atts_all,
                                       encoder_hidden_states = image_embeds_all,
                                       encoder_attention_mask = image_atts_all,      
                                       return_dict = True,
                                      )                         
          

        vl_embeddings = torch.cat([output_pos.last_hidden_state[:,0,:], output_neg.last_hidden_state[:,0,:]],dim=0)
        vl_output = self.itm_head(vl_embeddings)            

        itm_labels = torch.cat([torch.ones(bs,dtype=torch.long),torch.zeros(2*bs,dtype=torch.long)],
                               dim=0).to(image.device)
        loss_itm = F.cross_entropy(vl_output, itm_labels)     

        return loss_itc, loss_itm 
 

    @torch.no_grad()    
    def copy_params(self):
        for _, running_model, momentum_model in self.model_pairs:           
            for param, param_m in zip(running_model.parameters(), momentum_model.parameters()):
                param_m.data.copy_(param.data)  # initialize
                param_m.requires_grad_(False)  # not update by gradient    

            
    @torch.no_grad()        
    def _momentum_update(self):
        for pair_name, running_model, momentum_model in self.model_pairs:           
            for (pname, param), (bname, param_m) in zip(running_model.named_parameters(), momentum_model.named_parameters()):
                param_m.data = param_m.data * self.momentum + param.data * (1. - self.momentum)

    @torch.no_grad()
    def _external_momentum_update(self, name, momentum_model):
        if name == "visual_encoder":
            inner_model = self.visual_encoder
        elif name == "text_encoder":
            inner_model = self.text_encoder
        elif name == "vision_proj":
            inner_model = self.vision_proj
        elif name == "text_proj":
            inner_model = self.text_proj
        
        for (pname, param), (bname, param_m) in zip(inner_model.named_parameters(), momentum_model.named_parameters()):
            param_m.data = param.data * self.momentum + param_m.data * (1. - self.momentum)
        
        return momentum_model

                
    @torch.no_grad()
    def _dequeue_and_enqueue(self, image_feat, text_feat, idxs):
        # gather keys before updating queue
        # print("gathering images")
        image_feats = concat_all_gather(image_feat)
        # print("gathering texts")
        text_feats = concat_all_gather(text_feat)
        batch_size = image_feats.shape[0]

        ptr = int(self.ptr_queue)
        assert self.queue_size % batch_size == 0  # for simplicity

        # replace the keys at ptr (dequeue and enqueue)
        self.image_queue[:, ptr:ptr + batch_size] = image_feats.T
        self.text_queue[:, ptr:ptr + batch_size] = text_feats.T
        self.idx_queue[:, ptr:ptr + batch_size] = idxs.T
        ptr = (ptr + batch_size) % self.queue_size # move pointer
        self.ptr_queue[0] = ptr


    def load_from_pruned_pretrained(self, pretraining_weights, mask, config, is_eval=False):
        print(f"\n{'-'*100}")
        self.load_pretrained(pretraining_weights, config, is_eval)
        print(f"{'-'*100}\n\n")
        
        print(f"{'-'*100}\nLoading from mask at: {mask}")
        mask = torch.load(mask, map_location="cpu")
        mask = inherit_encoder_momentum_masks(mask)
        msg = self.load_state_dict(mask, strict=False)
        print("missing keys:")
        print([k for k in msg.missing_keys if "bias" not in k and "layernorm" not in k.lower() and "pruning_mask" in k])
        print("unexpected keys:")
        print([k for k in msg.unexpected_keys if "bias" not in k and "layernorm" not in k.lower() and "pruning_mask" in k and "text_decoder" not in k])
        print(f"{'-'*100}")


    def load_pretrained(self, weights_ckpt, config, is_eval=False):
        print("Loaded params from: ", weights_ckpt)
        _, msg = load_checkpoint(self, weights_ckpt)
        print("missing keys:")
        print([k for k in msg.missing_keys if "pruning_mask" not in k])

        # the checkpoint also contains the weights of the momentum encoders, which are not to be loaded 
        print("unexpected keys:")
        keys_to_exclude = ["visual_encoder_m", "text_encoder_m", "vision_proj_m", "text_proj_m", "text_decoder"]
        print([k for k in msg.unexpected_keys if not any([x in k for x in keys_to_exclude])])



def blip_retrieval(pretrained='',**kwargs):
    model = BLIPRetrieval(**kwargs)
    if pretrained:
        model, msg = load_checkpoint(model, pretrained)
        print("missing keys:")
        print(msg.missing_keys)
    return model 


@torch.no_grad()
def concat_all_gather(tensor):
    """
    Performs all_gather operation on the provided tensors.
    *** Warning ***: torch.distributed.all_gather has no gradient.
    """
    tensors_gather = [torch.ones_like(tensor) for _ in range(torch.distributed.get_world_size())]
    torch.distributed.all_gather(tensors_gather, tensor, async_op=False)
    output = torch.cat(tensors_gather, dim=0)
    return output      


class GatherLayer(torch.autograd.Function):
    """
    Gather tensors from all workers with support for backward propagation:
    This implementation does not cut the gradients as torch.distributed.all_gather does.
    """

    @staticmethod
    def forward(ctx, x):
        output = [torch.zeros_like(x) for _ in range(torch.distributed.get_world_size())]
        torch.distributed.all_gather(output, x)
        return tuple(output)

    @staticmethod
    def backward(ctx, *grads):
        all_gradients = torch.stack(grads)
        torch.distributed.all_reduce(all_gradients)
        return all_gradients[torch.distributed.get_rank()]


def all_gather_with_grad(tensors):
    """
    Performs all_gather operation on the provided tensors.
    Graph remains connected for backward grad computation.
    """
    # Queue the gathered tensors
    world_size = torch.distributed.get_world_size()
    # There is no need for reduction in the single-proc case
    if world_size == 1:
        return tensors

    tensor_all = GatherLayer.apply(tensors)

    return torch.cat(tensor_all, dim=0)
