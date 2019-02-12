import {UserService} from '../../user/user.service';
import {
  OperationCallback,
  OperationEvent,
  ResourceOperationMetadata,
  ResourceOperationTypesEnum
} from '@rxstack/platform';
import {
  associateWithCurrentUser,
  objectExists,
  restrictToRole, setNow,
  validate,
  validateUnique
} from '@rxstack/platform-callbacks';
import {TaskInput} from '../validations/task.input';
import {TaskService} from '../task.service';
import {Task} from '../task';

export const taskPreExecuteCallback = (): OperationCallback => {
  return async (event: OperationEvent): Promise<void> => {
    const metadata = event.metadata as ResourceOperationMetadata<Task>;
    await restrictToRole('ROLE_ADMIN')(event);
    await validate(TaskInput)(event);
    await validateUnique({
      service: TaskService,
      properties: ['name'],
      propertyPath: 'name'

    })(event);

    if (event.request.body['assignedTo']) {
      await objectExists({
        service: UserService,
        targetField: 'assignedTo',
        inverseField: 'username'
      })(event);
    }

    if (metadata.type === ResourceOperationTypesEnum.CREATE) {
      await associateWithCurrentUser({
        idField: 'username',
        targetField: 'createdBy'
      })(event);
      await associateWithCurrentUser({
        idField: 'username',
        targetField: 'updatedBy'
      })(event);
      await setNow('createdAt', 'updatedAt')(event);
    } else {
      await associateWithCurrentUser({
        idField: 'username',
        targetField: 'updatedBy'
      })(event);
      await setNow('updatedAt')(event);
    }
  };
};