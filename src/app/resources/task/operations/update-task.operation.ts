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
  restrictToRole,
  setNow, softDelete, validate, validateUnique
} from '@rxstack/platform-callbacks';
import {TaskInput} from '../validations/task.input';
import {UserService} from '../../user/user.service';

@Injectable()
@Operation<ResourceOperationMetadata<Task>>({
  type: ResourceOperationTypesEnum.UPDATE,
  name: 'app_task_update',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks/:id',
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
      targetField: 'updatedBy'
    }),
    setNow('updatedAt'),
    softDelete(),
    async (event: OperationEvent): Promise<void> => {
      if (event.request.params.has('assignedTo')) {
        await objectExists({
          service: UserService,
          targetField: 'assignedTo',
          inverseField: 'username'
        });
      }
    },
  ]
})
export class UpdateTaskOperation extends AbstractResourceOperation<Task> { }