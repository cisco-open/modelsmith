#!/bin/bash
pip install gdown

# finetune.tar.gz
gdown https://drive.google.com/uc?id=1-CHaAm5yxmEQwGN58y7g77Qjc7kmniOu
tar -xvf finetune.tar.gz
rm finetune.tar.gz

# pretrain.tar.gz
gdown https://drive.google.com/uc?id=1-E5KdPaoJ0I0N8ImnA4f1xvTBjL1HirL
tar -xvf pretrain.tar.gz
rm pretrain.tar.gz

# imagenet-annots.tar.gz
gdown https://drive.google.com/uc?id=1-Um5jhtLsI8hQjgaRYU9XO5C0Pc3AOwP
tar -xvf imagenet-annots.tar.gz
rm imagenet-annots.tar.gz

# flowers102-annots.tar.gz
gdown https://drive.google.com/uc?id=1-XTwKu28YY-vlB9zbgyi12fkqPV7nl9v
tar -xvf flowers102-annots.tar.gz
rm flowers102-annots.tar.gz

# weights.tar.gz
gdown https://drive.google.com/uc?id=1-XwsiOiIbx2dI7yYDcUP52OguF73aJ3Z
tar -xvf weights.tar.gz
rm weights.tar.gz

gdown https://drive.google.com/uc?id=1-Z-l1xggltfZJgFQZowxJRAz3y0jy01X
tar -xvf clip-vit-weights.tar.gz
rm clip-vit-weights.tar.gz

echo "Download complete. You should now have a 'data' folder with these subfolders: 'finetune', 'pretrain', 'flowers102' and 'imagenet'."
echo "You should also have a 'weights' folder with BLIP's and XVLM's pretraining weights. Please check everything is in place."