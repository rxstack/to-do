import {User} from '../../user/user';
import {IsNotEmpty, MinLength, ValidateIf} from 'class-validator';
import {Task} from '../task';
import * as _ from 'lodash';

export class TaskInput {
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ValidateIf((o: Task) => _.isString(o.assignedTo))
  @IsNotEmpty()
  assignedTo?: User;
}