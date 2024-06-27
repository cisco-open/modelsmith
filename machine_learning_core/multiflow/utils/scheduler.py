from typing import Any
from torch.optim.lr_scheduler import LambdaLR


class LRPolicy:
    def __init__(self, num_training_steps, num_warmup_steps) -> None:
        self.num_training_steps = num_training_steps
        self.num_warmup_steps = num_warmup_steps

    def __call__(self, current_step: int) -> Any:
        if current_step < self.num_warmup_steps:
            return float(current_step) / float(max(1, self.num_warmup_steps))
        return max(
            0.0, float(self.num_training_steps - current_step) / float(
                max(1, self.num_training_steps - self.num_warmup_steps))
        )

def create_scheduler(args, optimizer, last_epoch=-1):
    if 'num_training_steps' not in args:
        args['num_training_steps'] = args['epochs'] * args['step_per_epoch']
    print("### num_training_steps, ", args['num_training_steps'], flush=True)

    if isinstance(args['num_warmup_steps'], float):
        assert 0 <= args['num_warmup_steps'] < 1
        args['num_warmup_steps'] = int(args['num_training_steps'] * args['num_warmup_steps'])
    print("### num_warmup_steps, ", args['num_warmup_steps'], flush=True)

    if args.sched == 'linear':
        def lr_lambda(current_step: int):
            if current_step < args.num_warmup_steps:
                return float(current_step) / float(max(1, args.num_warmup_steps))
            return max(
                0.0, float(args.num_training_steps - current_step) / float(
                    max(1, args.num_training_steps - args.num_warmup_steps))
            )

        lr_scheduler = LambdaLR(optimizer, LRPolicy(args.num_training_steps, args.num_warmup_steps), last_epoch=last_epoch)
    else:
        raise NotImplementedError(f"args.sched == {args.sched}")

    return lr_scheduler
