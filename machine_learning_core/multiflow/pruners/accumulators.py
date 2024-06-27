import torch


def xvlm_general_forward(model, batch, device, custom_temp=None):
    # code taken from XVLM-pretraining
    images, batch = batch[0].to(device, non_blocking=True), [t.to(device) if t is not None else None for t in batch[1:]]
    text_ids, text_atts, text_ids_masked, masked_pos, masked_ids = batch
    loss_itc, loss_itm, loss_mlm = model(
        images, text_ids, text_atts, 
        text_ids_masked=text_ids_masked, masked_pos=masked_pos, masked_ids=masked_ids, custom_temp=custom_temp
    )
    loss = loss_itc + loss_itm + loss_mlm
    return loss


def blip_general_forward(model, batch, device, **kwargs):
    image, text_ids, text_atts = batch
    loss_ita, loss_itm, loss_lm = model(image.to(device), text_ids.to(device), text_atts.to(device), alpha = 0.)  
    loss = loss_ita + loss_itm + loss_lm  
    return loss


def vit_general_forward(model, batch, device, **kwargs):
    ce_loss = torch.nn.CrossEntropyLoss().to(device)
    images, labels = batch
    images = images.to(device)
    labels = labels.to(device)
    preds = model(images).logits
    loss = ce_loss(preds, labels)
    return loss


def general_forward(model_name, model, batch, device, **kwargs):
    if model_name == 'xvlm':
        return xvlm_general_forward(model, batch, device, **kwargs)
    elif model_name == 'blip':
        return blip_general_forward(model, batch, device, **kwargs)
    elif model_name in ('vit-b', 'dino'):
        return vit_general_forward(model, batch, device, **kwargs)
    else:
        raise ValueError(f"Model {model_name} not supported.")


def xvlm_forward_output(model, batch, device, modality="vision"):
    images, batch = batch[0].to(device, non_blocking=True), [t.to(device) if t is not None else None for t in batch[1:]]
    text_ids, text_atts, text_ids_masked, masked_pos, masked_ids = batch
    image_embeds, image_atts = model.get_vision_embeds(images)
    if modality == "vision":
        return image_embeds
    text_embeds = model.get_text_embeds(text_ids, text_atts)
    if modality == "text":
        return text_embeds
    output_cls_token = model.get_cross_embeds(image_embeds, image_atts, text_embeds=text_embeds, text_atts=text_atts)
    return output_cls_token


def blip_forward_output(model, batch, device, **kwargs):
    image, text_ids, text_atts = batch

    # forward the images through the vision encoder
    image_embeds = model.visual_encoder(image) 
    image_atts = torch.ones(image_embeds.size()[:-1], dtype=torch.long).to(device) 

    # forward the text through the image-grounded text encoder of the med
    encoder_input_ids = text_ids.clone()
    encoder_input_ids[:,0] = model.tokenizer.enc_token_id
    output_pos = model.text_encoder(
        encoder_input_ids,
        attention_mask = text_atts,
        encoder_hidden_states = image_embeds,
        encoder_attention_mask = image_atts,      
        return_dict = True,
    )      

    # forward the text through the image-grounded text decoder of the med (to store activations of the causal self-attention)
    decoder_input_ids = text_ids.clone()      
    decoder_input_ids[:,0] = model.tokenizer.bos_token_id
    decoder_output = model.text_decoder(
        decoder_input_ids, 
        attention_mask = text_atts, 
        encoder_hidden_states = image_embeds,
        encoder_attention_mask = image_atts,                  
        return_dict = True,   
    )   


def vit_forward_output(model, batch, device, **kwargs):
    images, _ = batch
    images = images.to(device)
    preds = model(images).logits
    return preds


def forward_output(model_name, model, batch, device, **kwargs):
    if model_name == 'xvlm':
        return xvlm_forward_output(model, batch, device, **kwargs)
    elif model_name == 'blip':
        return blip_forward_output(model, batch, device, **kwargs)
    elif model_name in ('vit-b', 'dino'):
        return vit_forward_output(model, batch, device, **kwargs)
    else:
        raise ValueError(f"Model {model_name} not supported.")


def xvlm_region_forward(model, region_batch, device, **kwargs):
    calc_image_bbox_loss = kwargs.get('calc_image_bbox_loss', False)
    custom_temp = kwargs.get('custom_temp', None)
    return_bbox_loss = kwargs.get('return_bbox_loss', False)

    # code taken from XVLM-pretraining
    images = region_batch[0].to(device, non_blocking=True)
    region_batch = [t.to(device) if t is not None else None for t in region_batch[1:]]

    # unroll region data
    idx_to_group_img, text_ids, text_atts, text_ids_masked, masked_pos, masked_ids, \
        image_atts, target_bbox, is_image = region_batch

    # no idea what this does, should check pretraining forward
    if calc_image_bbox_loss:
        is_image = None

    # forward pass with region data
    loss_itc, loss_itm, loss_mlm, loss_bbox, loss_giou = \
        model(images, text_ids, text_atts, text_ids_masked=text_ids_masked, masked_pos=masked_pos, masked_ids=masked_ids,
            image_atts=image_atts, idx_to_group_img=idx_to_group_img, target_bbox=target_bbox, is_image=is_image, ret_bbox_loss=True, custom_temp=custom_temp)

    # compute gradients
    if return_bbox_loss:
        loss = loss_itc + loss_itm + loss_mlm + loss_bbox + loss_giou
    else:
        loss = loss_itc + loss_itm + loss_mlm
    return loss


def blip_region_forward(model, region_batch, device, **kwargs):
    return blip_general_forward(model, region_batch, device, **kwargs)


def region_forward(model_name, model, batch, device, **kwargs):
    if model_name == 'xvlm':
        return xvlm_region_forward(model, batch, device, **kwargs)
    elif model_name == 'blip':
        return blip_region_forward(model, batch, device, **kwargs)
    else:
        raise ValueError(f"Model {model_name} not supported.")


def blip_region_forward_output(model, batch, device, **kwargs):
    return blip_forward_output(model, batch, device, **kwargs)


def xvlm_region_forward_output(model, region_batch, device, calc_image_bbox_loss=False):
    # code taken from XVLM-pretraining
    images = region_batch[0].to(device, non_blocking=True)
    region_batch = [t.to(device) if t is not None else None for t in region_batch[1:]]

    # unroll region data
    idx_to_group_img, text_ids, text_atts, text_ids_masked, masked_pos, masked_ids, \
        image_atts, target_bbox, is_image = region_batch

    # no idea what this does, should check pretraining forward
    if calc_image_bbox_loss:
        is_image = None

    # forward pass with region data
    image_embeds, image_atts, image_embeds_fullatts = model.get_vision_embeds(
        images, image_atts=image_atts, idx_to_group_img=idx_to_group_img
    )
    text_embeds = model.get_text_embeds(text_ids, text_atts)
    output_cls_token = model.get_cross_embeds(image_embeds, image_atts, text_embeds=text_embeds, text_atts=text_atts)
    return output_cls_token
    
    
def region_forward_output(model_name, model, batch, device, **kwargs):
    if model_name == 'xvlm':
        return xvlm_region_forward_output(model, batch, device, **kwargs)
    elif model_name == 'blip':
        return blip_region_forward_output(model, batch, device, **kwargs)
    else:
        raise ValueError(f"Model {model_name} not supported.")