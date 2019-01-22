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
  queryFilter, queryWithCurrentUser,
  rename,
  restrictToAuthenticatedUser,
  softDelete
} from '@rxstack/platform-callbacks';
import {taskListAdminQueryFilter} from '../query-filters/task-list-admin.query-filter';
import {taskListUserQueryFilter} from '../query-filters/task-list-user.query-filter';

@Injectable()
@Operation<ResourceOperationMetadata<Task>>({
  type: ResourceOperationTypesEnum.LIST,
  name: 'app_task_list',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks',
  service: TaskService,
  extra: {
    paginated: true
  },
  onPreExecute: [
    restrictToAuthenticatedUser(),
    async (event: OperationEvent): Promise<void> => {
      if (event.request.token.hasRole('ROLE_ADMIN')) {
        await queryFilter(taskListAdminQueryFilter)(event);
      }

      if (event.request.token.hasRole('ROLE_USER')) {
        await queryFilter(taskListUserQueryFilter)(event);
        await queryWithCurrentUser({idField: 'username', targetField: 'assignedTo'})(event);
      }
    },
    softDelete()
  ],
  onPostExecute: [
    rename('_id', 'id')
  ]
})
export class ListTaskOperation extends AbstractResourceOperation<Task> { }