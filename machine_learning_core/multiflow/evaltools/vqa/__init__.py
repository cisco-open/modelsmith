from .vqa import VQA
from .vqaEval import VQAEval

def vqa_eval(annotation_file, question_file, result_file, precision=2, verbose=False):
    vqa = VQA(annotation_file, question_file)
    vqaRes = vqa.loadRes(result_file, question_file)
    
    # create vqaEval object by taking vqa and vqaRes
    vqaEval = VQAEval(vqa, vqaRes, n=precision)
    vqaEval.evaluate() 

    overall_acc = vqaEval.accuracy['overall']
    dict_of_accs = vqaEval.accuracy['perAnswerType']
    
    # print accuracies
    if verbose:
        print(f"Overall Accuracy = {overall_acc:.{precision}f}")
        for ans_type, acc in dict_of_accs.items():
            print(f"{ans_type} Accuracy = {acc:.{precision}f}")

    results_dict = {"overall": overall_acc}
    results_dict.update(dict_of_accs)
    return results_dict