import {Injectable} from 'injection-js';
import {User} from './user';
import {MongooseService} from '@rxstack/mongoose-service';

@Injectable()
export class UserService extends MongooseService<User> { }