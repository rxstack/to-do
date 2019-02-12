import {QueryFilterSchema} from '@rxstack/query-filter';
import {merge} from 'lodash';
import {taskListUserQueryFilter} from './task-list-user.query-filter';

export const taskListAdminQueryFilter: QueryFilterSchema = merge(taskListUserQueryFilter, {
  'properties': {
    'assignedTo': {
      'operators': ['$eq', '$ne'],
      'sort': true
    }
  },
  'allowOrOperator': true
});
