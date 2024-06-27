import torch
from models.xvlm.xbert import BertLMHeadModel
from models import XVLMBase, load_pretrained


class XVLM(XVLMBase):  
    def __init__(self, config):
        super().__init__(config, load_vision_params=False, load_text_params=False,
                         use_contrastive_loss=False, use_matching_loss=False, use_mlm_loss=False, use_bbox_loss=False, config_text=None)

        self.pad_token_id = config['pad_token_id']
        config_enc = self.text_encoder.config

        self.text_encoder = None
        self.text_decoder = BertLMHeadModel(config=config_enc)

    def load_pretrained(self, ckpt_rpath, config, is_eval=False):
        if is_eval:
            state_dict = load_pretrained(ckpt_rpath, config, is_eval=True)
        else:
            state_dict = load_pretrained(ckpt_rpath, config, load_text=False)

            print("### Loading pretrained text encoder", flush=True)
            for key in list(state_dict.keys()):
                assert isinstance(key, str)
                if key.startswith('text_encoder.'):
                    decoder_key = key.replace('text_encoder.', 'text_decoder.')
                    state_dict[decoder_key] = state_dict[key]
                    del state_dict[key]

        msg = self.load_state_dict(state_dict, strict=False)
        print('load checkpoint from %s' % ckpt_rpath)
        print("missing_keys: ", [p for p in msg.missing_keys if 'vision_encoder' not in p])
        print("unexpected_keys: ", msg.unexpected_keys)


    def load_from_pruned_pretrained(self, ckpt_path, mask_path, config, verbose=False):
        # start by loading the weights from the pretrained checkpoint
        # since the pretrained model has a text encoder, but our model has a text decoder, we need to do some renaming
        weights_dict = load_pretrained(ckpt_path, config, load_text=False)
        for k in list(weights_dict.keys()):
            if k.startswith('text_encoder.'):
                print('renaming', k, 'to', k.replace('text_encoder.', 'text_decoder.'))
                weights_dict[k.replace('text_encoder.', 'text_decoder.')] = weights_dict[k]
                del weights_dict[k]
        msg = self.load_state_dict(weights_dict, strict=False)
        if verbose:
            print('='*50, 'WEIGHTS LOG', '='*50)
            print('Loaded weights from', ckpt_path)
            print("missing_keys: ", [p for p in msg.missing_keys if 'pruning_mask' not in p and 'vision_encoder' not in p])
            print("unexpected_keys: ", msg.unexpected_keys)

        # now load the mask
        # the whole renaming thing applies to the mask too
        mask_dict = torch.load(mask_path)
        for k in list(mask_dict.keys()):
            if k.startswith('text_encoder.'):
                mask_dict[k.replace('text_encoder.', 'text_decoder.')] = mask_dict[k]
                del mask_dict[k]
        msg = self.load_state_dict(mask_dict, strict=False)
        if verbose:
            print('='*50, 'MASK LOG', '='*50)
            print('Loaded mask from', mask_path)
            print("missing_keys: ", [p for p in msg.missing_keys if 'pruning_mask' in p and 'bias' not in p])
            print("unexpected_keys: ", msg.unexpected_keys)



    def forward(self, image, text_ids, text_atts):
        image_embeds = self.vision_encoder(image)
        image_atts = torch.ones(image_embeds.size()[:-1], dtype=torch.long).to(image.device)

        decoder_targets = text_ids.masked_fill(text_ids == self.pad_token_id, -100)

        loss = self.text_decoder(text_ids,
                                 attention_mask=text_atts,
                                 encoder_hidden_states=image_embeds,
                                 encoder_attention_mask=image_atts,
                                 labels=decoder_targets,
                                 return_dict=True,
                                 ).loss

        return loss
