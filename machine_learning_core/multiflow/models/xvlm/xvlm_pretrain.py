import torch
from models import XVLMBase


class XVLM(XVLMBase):
    def __init__(self, config):
        super().__init__(
            config,
            load_vision_params=True,
            load_text_params=True,
            use_contrastive_loss=True,
            use_matching_loss=True,
            use_mlm_loss=True,
            use_bbox_loss=True,
            config_text=None,
        )

    def forward(
        self,
        image,
        text_ids,
        text_atts,
        text_ids_masked=None,
        masked_pos=None,
        masked_ids=None,
        image_atts=None,
        idx_to_group_img=None,
        target_bbox=None,
        is_image=None,
        ret_bbox_loss=False,
        ret_losses=True,
        custom_temp=None
    ):
        if ret_bbox_loss:
            image_embeds, image_atts, image_embeds_fullatts = self.get_vision_embeds(
                image, image_atts=image_atts, idx_to_group_img=idx_to_group_img
            )
        else:
            image_embeds, image_atts = self.get_vision_embeds(image)

        text_embeds = self.get_text_embeds(text_ids, text_atts)

        with torch.no_grad():
            self.temp.clamp_(0.001, 0.5)

        image_feat, text_feat = self.get_features(image_embeds, text_embeds)
        self.vision_logits = image_feat
        self.text_logits = text_feat


        loss_itc = self.get_contrastive_loss(
            image_feat, 
            text_feat, 
            custom_temp=custom_temp
        )

        loss_itm = self.get_matching_loss(
            image_embeds, image_atts, image_feat, text_embeds, text_atts, text_feat,
            custom_temp=custom_temp
        )

        loss_mlm = self.get_mlm_loss(
            text_ids_masked, text_atts, image_embeds, image_atts, masked_pos, masked_ids,
            custom_temp=custom_temp
        )

        if ret_bbox_loss:
            output_coord = self.predict_bbox(
                image_embeds_fullatts, text_embeds, text_atts
            )
            loss_bbox, loss_giou = self.get_bbox_loss(
                output_coord, target_bbox, is_image=is_image
            )
            return loss_itc, loss_itm, loss_mlm, loss_bbox, loss_giou

        if ret_losses:
            return loss_itc, loss_itm, loss_mlm
        else:
            return torch.zeros(1).to(loss_itc)


    def get_logits(self):
        return {"vision": self.vision_logits, "text": self.text_logits}
    
    def matching_forward(self, image, text_ids, text_atts, avoid_useless_grad=False):
        with torch.no_grad() if avoid_useless_grad else torch.enable_grad():
            image_embeds, image_atts = self.get_vision_embeds(image)
            text_embeds = self.get_text_embeds(text_ids, text_atts, is_ids=True)
        fusion_embeds = self.get_cross_embeds(image_embeds, image_atts, text_embeds=text_embeds, text_atts=text_atts)
        matching_preds = self.itm_head(fusion_embeds[:, 0, :])
        return matching_preds