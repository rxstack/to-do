import {ProviderDefinition} from '@rxstack/core';
import {APP_TASK_OPERATION_PROVIDERS} from './operations/APP_TASK_OPERATION_PROVIDERS';
import {TaskService} from './task.service';

export const APP_TASK_PROVIDERS: ProviderDefinition[] = [
  {
    provide: TaskService,
    useFactory: () => new TaskService({idField: '_id', collectionName: 'tasks', defaultLimit: 25}),
    deps: [],
  },
  ...APP_TASK_OPERATION_PROVIDERS
];