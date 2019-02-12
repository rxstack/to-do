import {
  AbstractResourceOperation,
  Operation,
  ResourceOperationMetadata,
  ResourceOperationTypesEnum
} from '@rxstack/platform';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {taskPreExecuteCallback} from '../callbacks/task.pre-execute.callback';

@Operation<ResourceOperationMetadata<Task>>({
  type: ResourceOperationTypesEnum.UPDATE,
  name: 'app_task_update',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks/:id',
  service: TaskService,
  onPreExecute: [
    taskPreExecuteCallback()
  ]
})
export class UpdateTaskOperation extends AbstractResourceOperation<Task> { }