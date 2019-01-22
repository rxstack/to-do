import {ProviderDefinition} from '@rxstack/core';
import {APP_TASK_PROVIDERS} from './task/APP_TASK_PROVIDERS';
import {APP_USER_PROVIDERS} from './user/APP_USER_PROVIDERS';

export const APP_RESOURCE_PROVIDERS: ProviderDefinition[] = [
  ...APP_TASK_PROVIDERS,
  ...APP_USER_PROVIDERS
];