import torch
from torchvision import transforms
from transformers import ViTForImageClassification
from transformers import get_linear_schedule_with_warmup, get_cosine_schedule_with_warmup, get_constant_schedule
import lightning as L

from PIL import Image
from tqdm import tqdm
from datasets.vision_datasets import get_dataset
from utils.prune_utils import make_prunable, named_masked_parameters, stats
from utils.functions import get_unprunable_parameters
from utils.misc import num_params, millions


torch.set_float32_matmul_precision("medium")
IMAGENET_MEAN = [0.481, 0.457, 0.408]             
IMAGENET_STD = [0.268, 0.261, 0.275]     


def check_loaded_keys(missing_keys, unexpected_keys):
    error = False
    # some messages to make sure the pruning mask was loaded correctly
    for key in missing_keys:
        # we are not loading weights, so we do not care about missing keys that do not contain "_pruning_mask"
        if "_pruning_mask" not in key:
            continue
        
        # at the same time, the classifier is not a prunable layer, so we do not care about missing keys that contain "classifier"
        if "classifier" in key or "bias" in key:
            continue
        
        # in this other cases, something may have gone wrong, let the user check the missing keys
        else:
            print(f"Missing key: {key}")
            error = True
    
    # there should not be any unexpected keys, if so it may be worth investigating
    for key in unexpected_keys:            
        print(f"Unexpected key: {key}")
        error = True
    return error


def evaluate(model, test_loader):
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        
        for images, labels in tqdm(test_loader, desc="Evaluation on test dataset"):

            outputs = model(pixel_values=images)
            _, predicted = torch.max(outputs.logits, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    accuracy = 100 * correct / total
    return accuracy


def train(model, train_loader, optimizer, scheduler, fabric):
    model.train()
    criterion = torch.nn.CrossEntropyLoss().to(fabric.device)

    for batch_idx, (images, labels) in enumerate(train_loader):
        optimizer.zero_grad()

        outputs = model(pixel_values=images, interpolate_pos_encoding=True)
        logits = outputs.logits
        loss = criterion(logits, labels)
        
        fabric.backward(loss)
        optimizer.step()
        scheduler.step()

        if batch_idx % 32 == 0:
            fabric.log_dict({"loss": loss.item(), "lr": scheduler.get_last_lr()[0]})
            print(f"Batch {batch_idx+1}/{len(train_loader)}\tLoss: {loss.item():.4f}")


def get_transforms(image_size=224):
    train_transform = transforms.Compose([
        transforms.RandAugment(),
        transforms.RandomResizedCrop(image_size, interpolation=Image.BICUBIC),
        transforms.ToTensor(),
        transforms.Normalize(
            (0.48145466, 0.4578275, 0.40821073),
            (0.26862954, 0.26130258, 0.27577711),
        ),
    ])
    val_transform = transforms.Compose([
        transforms.Resize(256, interpolation=Image.BICUBIC),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(
            (0.48145466, 0.4578275, 0.40821073),
            (0.26862954, 0.26130258, 0.27577711),
        ),
    ])

    return train_transform, val_transform

def get_scheduler(optimizer, total_steps, warmup_frac=0.1, sched_type="cosine"):
    num_warmup_steps = int(warmup_frac * total_steps)
    if sched_type == "cosine":
        scheduler = get_cosine_schedule_with_warmup(optimizer, num_warmup_steps=num_warmup_steps, num_training_steps=total_steps)
    elif sched_type == "linear":
        scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=num_warmup_steps, num_training_steps=total_steps)
    elif sched_type == "constant":
        scheduler = get_constant_schedule(optimizer)
    return scheduler


def get_model(model_name, num_classes):
    # NOTE: we ran unimodal experiments only using DINO with a ViT-B/16 architecture; 
    # however, the code should be modular as long as one uses a VisionTransformer from HF transformers
    # (some minor modifications may be needed, but maybe not many)
    if model_name == "dino":
        model = ViTForImageClassification.from_pretrained(
            "facebook/dino-vitb16", 
            num_labels=num_classes
        )
    else:
        raise NotImplementedError(f"Model {model_name} not implemented")
    return model


def main(args):
    
    # define the transforms for the training and validation sets
    train_transform, val_transform = get_transforms()

    train_dataset, test_dataset, classes, num_classes = get_dataset(
        dataset_name=args.dataset, 
        data_dir=f"./data/{args.dataset}", 
        train_transform=train_transform, 
        test_transform=val_transform
    )

    # define the dataloaders
    train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=args.batch_size, shuffle=True, drop_last=True, num_workers=8)
    test_loader = torch.utils.data.DataLoader(test_dataset, batch_size=args.batch_size, shuffle=False, num_workers=8)

    # load the model (you can use a custom model by changing the get_model function below)
    model = get_model(args.model, num_classes)

    # make the model prunable and apply a pruning mask if defined in the args
    if args.mask is not None:
        # make the model prunable (attaches a pruning mask to each linear layer)
        make_prunable(model, mask_dtype=torch.bool, mask_on_the_fly=True, pattern_lock=True)
        pruning_mask = torch.load(args.mask)
        
        # discard the classifier masks from the pruning mask
        pruning_mask = {k: v for k, v in pruning_mask.items() if "classifier" not in k}
        msg = model.load_state_dict(pruning_mask, strict=False)
        
        # make sure nothing went wrong while loading the pruning mask
        error = check_loaded_keys(missing_keys=msg.missing_keys, unexpected_keys=msg.unexpected_keys)
        if error:
            raise ValueError("Error while loading the pruning mask. Please check if the mask is compatible with the model.")

        # setting this attribute is necessary for some custom utilities to work
        setattr(model, "name", args.model)

        # log some stats regarding the pruned parameters
        print(f"Total Params: {millions(num_params(model)):.2f}M")
        remaining_params, total_params = stats(named_masked_parameters(model, exclude=get_unprunable_parameters(model.name)))
        print(f"Remaining params: {millions(remaining_params, decimals=2)} / {millions(total_params, decimals=2)} ({remaining_params/total_params*100:.2f}%)")

    # define the scheduler and optimizer
    optimizer = torch.optim.Adam(model.parameters(), lr=args.lr, betas=(0.9,0.999), eps=1e-08)
    total_steps = len(train_loader) * args.epochs

    # set the warmup steps equal to the first warmup of training steps
    scheduler = get_scheduler(optimizer, total_steps, warmup_frac=args.warmup_frac, sched_type=args.sched_type)

    # NOTE: I am sorry, but there is no support for Weights & Biases here :(

    # I am wrapping everything with Fabric even though I have always used a single device
    # for two reasons: (1) it is easy to scale to multiple devices, (2) it automatically handles different precision strategies
    fabric = L.Fabric(
        accelerator="cuda",
        strategy="ddp",
        precision="16-mixed",
        devices=args.devices
    )
    fabric.launch()

    # reproducibility
    fabric.seed_everything(args.seed)
    torch.backends.cudnn.benchmark = False
    torch.use_deterministic_algorithms(True)

    model, optimizer = fabric.setup(model, optimizer)
    train_loader, test_loader = fabric.setup_dataloaders(train_loader, test_loader)

    # overly simple training loop
    for epoch in range(args.epochs):
        
        print(f"\nStarting Epoch {epoch+1}/{args.epochs}")
        train(model, train_loader, optimizer, scheduler, fabric)

        acc = evaluate(model, test_loader)
        print(f"Epoch {epoch+1}/{args.epochs}, Test Accuracy: {acc:.2f}%")
    
    print(f"Done training {args.model} on {args.dataset}!")
    

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    
    # data args
    parser.add_argument("--image_size", type=int, default=224)

    # training args
    # all default arguments are the ones used in the paper
    parser.add_argument("--model", type=str, default='dino', choices=["dino"])
    parser.add_argument("--dataset", type=str, default="cifar10", choices=["cifar10", "cifar100", "flowers102"])
    parser.add_argument("--batch_size", type=int, default=32)
    parser.add_argument("--epochs", type=int, default=10)
    parser.add_argument("--lr", type=float, default=1e-5)
    parser.add_argument("--devices", type=int, default=1)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--warmup_frac", type=float, default=0.1)
    parser.add_argument("--sched_type", type=str, default="cosine")

    # pruning args
    parser.add_argument("--mask", type=str, default=None, help="Path to a mask to apply to the model")

    # parse and run
    args = parser.parse_args()
    main(args)