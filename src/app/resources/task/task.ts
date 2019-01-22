import {User} from '../user/user';

export interface Task {
  _id: string;
  name: string;
  assignedTo?: User | string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  deletedAt?: Date;
  createdBy: User | string;
  updatedBy: User | string;
}