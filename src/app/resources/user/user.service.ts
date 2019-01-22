import {MemoryService} from '@rxstack/memory-service';
import {Injectable} from 'injection-js';
import {User} from './user';

@Injectable()
export class UserService extends MemoryService<User> { }