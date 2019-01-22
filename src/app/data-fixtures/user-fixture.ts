import {AbstractFixture} from '@rxstack/data-fixtures';
import {Injectable} from 'injection-js';
import {environment} from '../../environments/environment';
import {UserService} from '../resources/user/user.service';

@Injectable()
export class UserFixture extends AbstractFixture {

  async load(): Promise<void> {
    const service = this.injector.get(UserService);
    await service.insertMany(environment.in_memory_users);
  }

  getName(): string {
    return 'user';
  }
}