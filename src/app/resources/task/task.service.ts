import {MemoryService} from '@rxstack/memory-service';
import {Task} from './task';
import {Injectable} from 'injection-js';

@Injectable()
export class TaskService extends MemoryService<Task> { }