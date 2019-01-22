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
  associateWithCurrentUser,
  queryWithCurrentUser,
  setNow, softDelete, validate
} from '@rxstack/platform-callbacks';
import {TaskPatchInput} from '../validations/task-patch.input';
import {BadRequestException} from '@rxstack/exceptions';

@Injectable()
@Operation<ResourceOperationMetadata<Task>>({
  type: ResourceOperationTypesEnum.PATCH,
  name: 'app_task_patch',
  transports: ['HTTP', 'SOCKET'],
  httpPath: '/tasks/:id',
  service: TaskService,
  onPreExecute: [
    validate(TaskPatchInput),
    async (event: OperationEvent): Promise<void> => {
      event.request.attributes.set('criteria', {
        '_id': { '$eq': event.request.params.get('id') }
      });
    },
    queryWithCurrentUser({idField: 'username', targetField: 'assignedTo'}),
    softDelete(),
    associateWithCurrentUser({
      idField: 'username',
      targetField: 'updatedBy'
    }),
    setNow('updatedAt'),
    async (event: OperationEvent): Promise<void> => {
      event.request.body['completedAt'] = event.request.body['completed'] ? new Date() : null;
      delete event.request.body['completed'];
    }
  ],
  onPostExecute: [
    async (event: OperationEvent): Promise<void> => {
      if (event.getData() < 1) {
        throw new BadRequestException('Patch was not successful');
      }
    }
  ]
})
export class PatchTaskOperation extends AbstractResourceOperation<Task> { }