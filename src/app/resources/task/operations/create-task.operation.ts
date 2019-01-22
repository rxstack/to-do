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
  associateWithCurrentUser, objectExists,
  rename,
  restrictToRole,
  setNow, softDelete, validate, validateUnique
} from '@rxstack/platform-callbacks';
import {TaskInput} from '../validations/task.input';
import {UserService} from '../../user/user.service';

@Injectable()
@Operation<ResourceOperationMetadata<Task>>({
  type: ResourceOperationTypesEnum.CREATE,
  name: 'app_task_create',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks',
  service: TaskService,
  onPreExecute: [
    restrictToRole('ROLE_ADMIN'),
    validate(TaskInput),
    validateUnique({
      service: TaskService,
      properties: ['name'],
      propertyPath: 'name'

    }),
    associateWithCurrentUser({
      idField: 'username',
      targetField: 'createdBy'
    }),
    associateWithCurrentUser({
      idField: 'username',
      targetField: 'updatedBy'
    }),
    setNow('createdAt', 'updatedAt'),
    async (event: OperationEvent): Promise<void> => {
      if (event.request.body['assignedTo']) {
        await objectExists({
          service: UserService,
          targetField: 'assignedTo',
          inverseField: 'username'
        });
      }
    },
    softDelete({addOnCreate: true})
  ],
  onPostExecute: [
    rename('_id', 'id'),
  ]
})
export class CreateTaskOperation extends AbstractResourceOperation<Task> { }