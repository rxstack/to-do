import {ProviderDefinition} from '@rxstack/core';
import {ListTaskOperation} from './list-task.operation';
import {CreateTaskOperation} from './create-task.operation';
import {UpdateTaskOperation} from './update-task.operation';
import {GetTaskOperation} from './get-task.operation';
import {PatchTaskOperation} from './patch-task.operation';
import {RemoveTaskOperation} from './remove-task.operation';

export const APP_TASK_OPERATION_PROVIDERS: ProviderDefinition[] = [
  { provide: ListTaskOperation, useClass: ListTaskOperation },
  { provide: CreateTaskOperation, useClass: CreateTaskOperation },
  { provide: UpdateTaskOperation, useClass: UpdateTaskOperation },
  { provide: GetTaskOperation, useClass: GetTaskOperation },
  { provide: PatchTaskOperation, useClass: PatchTaskOperation },
  { provide: RemoveTaskOperation, useClass: RemoveTaskOperation },
];