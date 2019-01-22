import {AbstractFixture} from '@rxstack/data-fixtures';
import {Injectable} from 'injection-js';
import {TaskService} from '../resources/task/task.service';

@Injectable()
export class TaskFixture extends AbstractFixture {

  async load(): Promise<void> {
    const service = this.injector.get(TaskService);
    await service.insertMany([
      {
        '_id': '1',
        'name': 'task-1',
        'createdBy': 'admin',
        'updatedBy': 'admin',
        'assignedTo': 'user',
        'deletedAt': null
      },
      {
        '_id': '2',
        'name': 'task-2',
        'createdBy': 'admin',
        'updatedBy': 'admin',
        'deletedAt': null
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