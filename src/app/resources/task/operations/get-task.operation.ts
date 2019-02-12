import {
  AbstractResourceOperation,
  Operation, OperationEvent,
  ResourceOperationMetadata,
  ResourceOperationTypesEnum
} from '@rxstack/platform';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {
  restrictToOwner,
} from '@rxstack/platform-callbacks';

@Operation<ResourceOperationMetadata<Task>>({
  type: ResourceOperationTypesEnum.GET,
  name: 'app_task_get',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks/:id',
  service: TaskService,
  onPreExecute: [
    async (event: OperationEvent): Promise<void> => {
      if (event.request.token.hasRole('ROLE_USER')) {
        await restrictToOwner({idField: 'username', targetField: 'assignedTo'})(event);
      }
    }
  ]
})
export class GetTaskOperation extends AbstractResourceOperation<Task> { }