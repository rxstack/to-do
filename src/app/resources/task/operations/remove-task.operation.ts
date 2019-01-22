import {Injectable} from 'injection-js';
import {
  AbstractResourceOperation,
  Operation,
  ResourceOperationMetadata,
  ResourceOperationTypesEnum
} from '@rxstack/platform';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {
  restrictToRole, softDelete,
} from '@rxstack/platform-callbacks';

@Injectable()
@Operation<ResourceOperationMetadata<Task>>({
  type: ResourceOperationTypesEnum.REMOVE,
  name: 'app_task_remove',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks/:id',
  service: TaskService,
  onPreExecute: [
    restrictToRole('ROLE_ADMIN'),
    softDelete()
  ]
})
export class RemoveTaskOperation extends AbstractResourceOperation<Task> { }