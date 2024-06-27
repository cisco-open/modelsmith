import json
import os
import argparse

def transform_metadata(input_file, output_file, dataset):
    with open(input_file, 'r') as f:
        metadata = json.load(f)
    
    data = []
    for item in metadata:
        image_name = item.get("image")
        caption = item.get("caption", "")
        image_path = os.path.join("images", dataset, image_name)
        
        if image_name:
            data.append({
                "image": image_path,
                "caption": caption,
                "dataset": dataset
            })
    
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)
    
    print(f"Transformed JSON file has been generated and saved as {output_file}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Transform metadata.json to the required format")
    parser.add_argument('input_file', type=str, help='Path to the input file (metadata.json)')
    parser.add_argument('output_file', type=str, help='Path and name of the output file (e.g., cc3m_pretrain.json)')
    parser.add_argument('dataset', type=str, help='Name of the dataset (cc3m or sbu)')
    
    args = parser.parse_args()
    transform_metadata(args.input_file, args.output_file, args.dataset)