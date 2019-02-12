import {ProviderDefinition} from '@rxstack/core';
import {TaskObserver} from './task.observer';

export const APP_TASK_OBSERVER_PROVIDERS: ProviderDefinition[] = [
  {provide: TaskObserver, useClass: TaskObserver},
];