import {Injectable} from 'injection-js';
import {
  AbstractResourceOperation,
  Operation, OperationEvent,
  ResourceOperationMetadata,
  ResourceOperationTypesEnum
} from '@rxstack/platform';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {
  alter,
  populate,
  rename, restrictToAuthenticatedUser, restrictToOwner,
  softDelete,
} from '@rxstack/platform-callbacks';
import {UserService} from '../../user/user.service';

@Injectable()
@Operation<ResourceOperationMetadata<Task>>({
  type: ResourceOperationTypesEnum.GET,
  name: 'app_task_get',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks/:id',
  service: TaskService,
  onPreExecute: [
    restrictToAuthenticatedUser(),
    async (event: OperationEvent): Promise<void> => {
      if (event.request.token.hasRole('ROLE_USER')) {
        await restrictToOwner({idField: 'username', targetField: 'assignedTo'})(event);
      }
    },
    softDelete()
  ],
  onPostExecute: [
    rename('_id', 'id'),
    populate({
      service: UserService,
      targetField: 'createdBy',
      inverseField: 'username',
    }),
    alter('omit', ['password', 'roles'], 'createdBy')
  ]
})
export class GetTaskOperation extends AbstractResourceOperation<Task> { }