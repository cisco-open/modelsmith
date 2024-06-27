from .mag import Mag
from .rand import Rand
from .snip import SNIP
from .itersnip import IterSNIP
from .lamp import Lamp
from .chita import Chita
from .tamt import TAMT
from .l2 import LayerWiseL2Norm
from .multiflow import MultiFlow

available_pruners = ['omp', 'rand', 'snip', 'itersnip', 'lamp', 'chita', 'tamt', 'l2', 'multiflow'] 

def get_pruner_by_name(name, *args, **kwargs):
    """
    Unified interface to get pruner by name.
    """
    return {
        'omp': Mag,
        'rand': Rand,
        'snip': SNIP,
        'itersnip': IterSNIP,
        'lamp': Lamp,
        'chita': Chita,
        'tamt': TAMT,
        'l2': LayerWiseL2Norm,
        'multiflow': MultiFlow
    }[name](*args, **kwargs)