import { InjectionToken } from '@angular/core';
import { Client } from './services/client/client';

export const CLIENT = new InjectionToken<Client>('CLIENT');
