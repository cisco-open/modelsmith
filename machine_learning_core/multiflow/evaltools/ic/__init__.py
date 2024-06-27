import os
from pycocotools.coco import COCO
from pycocoevalcap.eval import COCOEvalCap

def coco_caption_eval(annotation_file, results_file):
    assert os.path.exists(annotation_file)

    # create coco object and coco_result object
    coco = COCO(annotation_file)
    coco_result = coco.loadRes(results_file)

    # create coco_eval object by taking coco and coco_result
    coco_eval = COCOEvalCap(coco, coco_result)

    # evaluate results
    coco_eval.evaluate()

    # print output evaluation scores
    for metric, score in coco_eval.eval.items():
        print(f'{metric}: {score:.3f}', flush=True)

    return coco_eval