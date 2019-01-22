import {IsBoolean} from 'class-validator';

export class TaskPatchInput {

  @IsBoolean()
  completed: boolean;
}