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
  type: ResourceOperationTypesEnum.CREATE,
  name: 'app_task_create',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks',
  service: TaskService,
  onPreExecute: [
    taskPreExecuteCallback()
  ]
})
export class CreateTaskOperation extends AbstractResourceOperation<Task> { }