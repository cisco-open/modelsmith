#!/bin/bash

# Set the base directory where the data folder will be created
BASE_DIR="./machine_learning_core/multiflow"

# Ensure the base directory exists
mkdir -p $BASE_DIR

pip install gdown

# finetune.tar.gz
gdown https://drive.google.com/uc?id=1-CHaAm5yxmEQwGN58y7g77Qjc7kmniOu -O $BASE_DIR/finetune.tar.gz
tar -xvf $BASE_DIR/finetune.tar.gz -C $BASE_DIR
rm $BASE_DIR/finetune.tar.gz

# pretrain.tar.gz
gdown https://drive.google.com/uc?id=1-E5KdPaoJ0I0N8ImnA4f1xvTBjL1HirL -O $BASE_DIR/pretrain.tar.gz
tar -xvf $BASE_DIR/pretrain.tar.gz -C $BASE_DIR
rm $BASE_DIR/pretrain.tar.gz

# imagenet-annots.tar.gz
gdown https://drive.google.com/uc?id=1-Um5jhtLsI8hQjgaRYU9XO5C0Pc3AOwP -O $BASE_DIR/imagenet-annots.tar.gz
tar -xvf $BASE_DIR/imagenet-annots.tar.gz -C $BASE_DIR
rm $BASE_DIR/imagenet-annots.tar.gz

# flowers102-annots.tar.gz
gdown https://drive.google.com/uc?id=1-XTwKu28YY-vlB9zbgyi12fkqPV7nl9v -O $BASE_DIR/flowers102-annots.tar.gz
tar -xvf $BASE_DIR/flowers102-annots.tar.gz -C $BASE_DIR
rm $BASE_DIR/flowers102-annots.tar.gz

# weights.tar.gz
gdown https://drive.google.com/uc?id=1-XwsiOiIbx2dI7yYDcUP52OguF73aJ3Z -O $BASE_DIR/weights.tar.gz
tar -xvf $BASE_DIR/weights.tar.gz -C $BASE_DIR
rm $BASE_DIR/weights.tar.gz

# clip-vit-weights.tar.gz
gdown https://drive.google.com/uc?id=1-Z-l1xggltfZJgFQZowxJRAz3y0jy01X -O $BASE_DIR/clip-vit-weights.tar.gz
tar -xvf $BASE_DIR/clip-vit-weights.tar.gz -C $BASE_DIR
rm $BASE_DIR/clip-vit-weights.tar.gz

echo "Download complete. You should now have a 'data' folder inside 'multiflow' with these subfolders: 'finetune', 'pretrain', 'flowers102', and 'imagenet'."
echo "You should also have a 'weights' folder with BLIP's and XVLM's pretraining weights. Please check everything is in place."
