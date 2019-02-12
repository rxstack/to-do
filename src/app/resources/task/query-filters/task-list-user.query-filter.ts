import {QueryFilterSchema} from '@rxstack/query-filter';

export const taskListUserQueryFilter: QueryFilterSchema = {
  'properties': {
    'search': {
      'property_path': 'name',
      'operators': ['$eq'],
      'replace_operators': [['$eq', '$regex']],
      'transformers': [
        (value: any) => new RegExp(`${value}`, 'i')
      ],
      'sort': true
    },
    'completed': {
      'property_path': 'completedAt',
      'operators': ['$eq'],
      'replace_operators': [['$eq', '$lte']],
      'transformers': [
        (value: any) => value === 'true' ? new Date() : null
      ],
      'sort': true
    }
  },
  'allowOrOperator': false,
  'defaultLimit': 25
};
