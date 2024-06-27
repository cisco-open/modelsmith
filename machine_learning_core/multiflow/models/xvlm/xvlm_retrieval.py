import torch
import torch.nn.functional as F
from collections import OrderedDict
from models import XVLMBase, load_pretrained, load_pretrained_weights_and_masks


class XVLM(XVLMBase):
    def __init__(self, config):
        super().__init__(config, load_vision_params=False, load_text_params=False,
                         use_contrastive_loss=True, use_matching_loss=True, use_mlm_loss=False, use_bbox_loss=False)

        self.num_attention_heads = self.text_encoder.config.num_attention_heads
        self.init_params = []

    def load_pretrained(self, ckpt_rpath, config, is_eval=False, verbose=True):
        state_dict = load_pretrained(ckpt_rpath, config, is_eval=is_eval, load_text=True)
        msg = self.load_state_dict(state_dict, strict=False)
        if verbose:
            print('load checkpoint from %s' % ckpt_rpath)
            print("missing_keys: ", [p for p in msg.missing_keys if 'vision_encoder' not in p])
            print("unexpected_keys: ", msg.unexpected_keys)

    def load_from_pruned_pretrained(self, weights_ckpt, masks_ckpt, config, is_eval=False, verbose=True):
        weights_dict, mask_dict = load_pretrained_weights_and_masks(weights_ckpt, masks_ckpt, config, is_eval, load_text=True)
        msg = self.load_state_dict(weights_dict, strict=False)
        if verbose:
            print('=' * 80, 'MESSAGE FOR WEIGHTS', '=' * 80)
            print(f'loaded weights from {weights_ckpt}.')
            print("missing_keys: ", [p for p in msg.missing_keys if 'vision_encoder' not in p and 'pruning_mask' not in p])
            print("unexpected_keys: ", msg.unexpected_keys)
        
        # NOTE: in the retrieval model, the text encoder is directly accessed by self.text_encoder
        # in other tasks, it will be accessed by self.text_encoder.bert (e.g. in the VQA model)
        mask_dict = OrderedDict({k.replace('text_encoder.bert', 'text_encoder'): v for k, v in mask_dict.items()})
        msg = self.load_state_dict(mask_dict, strict=False)
        if verbose:
            print('=' * 80, 'MESSAGE FOR MASKS', '=' * 80)
            print(f'loaded masks from {masks_ckpt}.')
            print("missing_keys: ", [p for p in msg.missing_keys if 'vision_encoder' not in p and 'pruning_mask' in p and 'bias' not in p])
            print("unexpected_keys: ", msg.unexpected_keys)
        

    def forward(self, image, text_ids, text_atts, return_losses=False, idx=None, scores_only=False, base=False, **kwargs):
        
        # methods for inference
        if scores_only:
            return self.get_itm_scores(image, text_ids, text_atts, both=True)
        elif base:
            return self.base_forward(image, text_ids, text_atts)

        # methods for training
        image_embeds, image_atts = self.get_vision_embeds(image)
        text_embeds = self.get_text_embeds(text_ids, text_atts)
        image_feat, text_feat = self.get_features(image_embeds, text_embeds)
        if return_losses:
            loss_itc = self.get_contrastive_loss(image_feat, text_feat, idx=idx)
            loss_itm = self.get_matching_loss(image_embeds, image_atts, image_feat, text_embeds, text_atts, text_feat, idx=idx)
            return loss_itc, loss_itm
        else:
            contrastive_matrix = self.get_matrix_for_contrastive_loss(image_feat, text_feat)
            itm_preds, itm_labels = self.get_matching_loss(
                image_embeds, 
                image_atts, 
                image_feat,
                text_embeds, 
                text_atts, 
                text_feat, 
                idx=idx,
                ret_loss=False
            )
            return contrastive_matrix, itm_preds, itm_labels
        
    
    def get_multimodal_feats(self, image_embeds, image_atts, text_embeds, text_atts):
        r"""
        Process a batch of images and their texts, and return the [CLS] token of each
        multimodal pair. Params:  
        - `image_embeds`: `torch.Tensor` with size `(batch_size, seq_length, embed_dim)`, 
        (the output of the Vision Encoder + Vision Projection if present);  
        - `image_atts`: binary tensor with size `(batch_size, seq_length)`, indicating which
        tokens to take into account in each image;  
        - `text_embeds`: `torch.Tensor` of size `(batch_size, seq_length, embed_dim)` 
        (the output of the Text Encoder + Text Projection if present);
        - `text_atts`: dual of `image_atts`, but for texts. Usually, these come from a tokenizer.
        """

        # pass vision+text features in the cross-modal encoder
        mm_output = self.text_encoder(
            encoder_embeds=text_embeds,
            attention_mask=text_atts,
            encoder_hidden_states=image_embeds,
            encoder_attention_mask=image_atts,
            mode='fusion',
            return_dict=True
        )

        # extract the [CLS] token for each image-text pair and return
        return mm_output.last_hidden_state[:, 0, :]


    def get_itm_scores(self, images, text_ids, text_atts, both=False):
        # extract all the text amd image embeddings
        text_embeds = self.get_text_embeds(text_ids, text_atts)
        image_embeds, image_atts = self.get_vision_embeds(images)

        # pass the image+text features in the fusion encoder
        multimodal_feats = self.get_multimodal_feats(image_embeds, image_atts, text_embeds, text_atts)

        # finally, pass the multmodal [CLS] tokens in the Image-Text Matching head to get the scores
        itm_scores = F.softmax(self.itm_head(multimodal_feats), dim=-1)
        if both:
            return itm_scores
        else:
            return itm_scores[:, 1] # grab only the positive score (i.e. position 1)


    def base_forward(self, images, text_ids, text_atts):
        r"""
        Process a batch of images and their texts, and returns the contrastive 
        matrix. No multimodal fusion is performed."""

        # extract all the text amd image embeddings
        text_embeds = self.get_text_embeds(text_ids, text_atts)
        image_embeds, image_atts = self.get_vision_embeds(images)

        # project and grab [CLS] tokens
        image_embeds = self.vision_proj(image_embeds[:,0,:])
        text_embeds = self.text_proj(text_embeds[:,0,:])

        # normalize features
        # NOTE: equivalent to F.normalize({image|text}_embeds, p=2, dim=-1)
        image_embeds = image_embeds / image_embeds.norm(p=2, dim=-1, keepdim=True)
        text_embeds = text_embeds / text_embeds.norm(p=2, dim=-1, keepdim=True)

        # compute cosine similarity with temperature scaling
        logit_scale = self.temp.exp()
        logits_per_text = torch.matmul(text_embeds, image_embeds.t()) * logit_scale
        logits_per_image = logits_per_text.t()

        return logits_per_image, logits_per_text