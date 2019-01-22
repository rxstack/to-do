import {ProviderDefinition, UserInterface} from '@rxstack/core';
import {InMemoryUserProvider, USER_PROVIDER_REGISTRY} from '@rxstack/security';
import {environment} from '../environments/environment';
import {User} from './resources/user/user';

export const APP_COMMON_PROVIDERS: ProviderDefinition[] = [
  {
    provide: USER_PROVIDER_REGISTRY,
    useFactory: () => {
      return new InMemoryUserProvider<UserInterface>(
        environment.in_memory_users,
        (data: UserInterface) => new User(data.username, data.password, data.roles)
      );
    },
    deps: [],
    multi: true
  },
];