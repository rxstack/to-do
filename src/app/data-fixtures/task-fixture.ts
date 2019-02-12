import {AbstractFixture} from '@rxstack/data-fixtures';
import {Injectable} from 'injection-js';
import {TaskService} from '../resources/task/task.service';

@Injectable()
export class TaskFixture extends AbstractFixture {

  async load(): Promise<void> {
    const service = this.injector.get(TaskService);
    await service.insertMany([
      {
        '_id': 't-1',
        'name': 'task-1',
        'createdBy': 'admin',
        'updatedBy': 'admin',
        'assignedTo': 'user',
      },
      {
        '_id': 't-2',
        'name': 'task-2',
        'createdBy': 'admin',
        'updatedBy': 'admin',
        'assignedTo': null,
      }
    ]);
  }

  getName(): string {
    return 'task';
  }

  getOrder(): number {
    return 1;
  }
}