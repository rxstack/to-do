import {QueryFilterSchema} from '@rxstack/query-filter';

export const taskListAdminQueryFilter: QueryFilterSchema = {
  'properties': {
    'id': {
      'property_path': '_id',
      'operators': ['$eq'],
      'sort': false
    },
    'name': {
      'property_path': 'name',
      'operators': ['$in', '$eq'],
      'sort': true
    },
    'createdAt': {
      'property_path': 'createdAt',
      'operators': ['$gt', '$lt'],
      'transformers': [
        (value: any) => new Date(value)
      ],
      'sort': true
    },
    'updatedAt': {
      'property_path': 'updatedAt',
      'operators': ['$gt', '$lt'],
      'transformers': [
        (value: any) => new Date(value)
      ],
      'sort': true
    },
    'completed': {
      'property_path': 'completed',
      'operators': ['$eq'],
      'transformers': [
        (value: any) => value === 'true' ? true : false
      ],
      'sort': true
    },
    'assignedTo': {
      'property_path': 'assignedTo',
      'operators': ['$eq', '$ne'],
      'sort': true
    }
  },
  'allowOrOperator': true,
  'defaultLimit': 25
};
