import {ProviderDefinition} from '@rxstack/core';
import {UserService} from './user.service';

export const APP_USER_PROVIDERS: ProviderDefinition[] = [
  {
    provide: UserService,
    useFactory: () => new UserService({idField: 'username', collectionName: 'users', defaultLimit: 25}),
    deps: [],
  },
];