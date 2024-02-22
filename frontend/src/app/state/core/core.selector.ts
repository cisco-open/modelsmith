import { createFeatureSelector } from '@ngrx/store';
import { CoreState } from './core.state';

export const selectCoreState = createFeatureSelector<CoreState>('core');
