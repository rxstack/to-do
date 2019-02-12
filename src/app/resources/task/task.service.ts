import {Task} from './task';
import {Injectable} from 'injection-js';
import {MongooseService} from '@rxstack/mongoose-service';

@Injectable()
export class TaskService extends MongooseService<Task> { }