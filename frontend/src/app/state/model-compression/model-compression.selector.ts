import { createFeatureSelector } from '@ngrx/store';
import { ModelCompressionState } from './model-compression.state';

export const selectModelCompression = createFeatureSelector<ModelCompressionState>('model-compression');
