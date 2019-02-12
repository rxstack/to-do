import {
  AbstractResourceOperation,
  Operation,
  ResourceOperationMetadata,
  ResourceOperationTypesEnum
} from '@rxstack/platform';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {
  restrictToRole,
} from '@rxstack/platform-callbacks';

@Operation<ResourceOperationMetadata<Task>>({
  type: ResourceOperationTypesEnum.REMOVE,
  name: 'app_task_remove',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks/:id',
  service: TaskService,
  onPreExecute: [
    restrictToRole('ROLE_ADMIN')
  ]
})
export class RemoveTaskOperation extends AbstractResourceOperation<Task> { }