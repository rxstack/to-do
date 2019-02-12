import {ProviderDefinition} from '@rxstack/core';
import {APP_TASK_OPERATION_PROVIDERS} from './operations/APP_TASK_OPERATION_PROVIDERS';
import {TaskService} from './task.service';
import {Connection} from 'mongoose';
import {taskMongooseSchema} from './schemas/task.mongoose.schema';
import {APP_TASK_OBSERVER_PROVIDERS} from './observers/APP_TASK_OBSERVER_PROVIDERS';

export const APP_TASK_PROVIDERS: ProviderDefinition[] = [
  {
    provide: TaskService,
    useFactory: (conn: Connection) => new TaskService({
      idField: '_id', defaultLimit: 25, model: conn.model('Task', taskMongooseSchema, 'tasks')
    }),
    deps: [Connection],
  },
  ...APP_TASK_OPERATION_PROVIDERS,
  ...APP_TASK_OBSERVER_PROVIDERS
];