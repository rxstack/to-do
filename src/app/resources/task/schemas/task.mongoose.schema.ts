import { Schema } from 'mongoose';
import {Task} from '../task';
const uuid = require('uuid/v4');

export const taskMongooseSchema = new Schema<Task>({
  _id: { type: String, default: uuid },
  name: { type: String, unique: true, required: true},
  createdBy: { type: String, ref: 'user', required: true },
  updatedBy: { type: String, ref: 'user', required: true },
  assignedTo: { type: String, ref: 'user', required: false, default: null },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  deletedAt: { type: Date, 'default': null },
  completedAt: { type: Date, 'default': null }
}, {_id: false, versionKey: false });

