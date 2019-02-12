import {ProviderDefinition} from '@rxstack/core';
import {UserService} from './user.service';
import {userMongooseSchema} from './schemas/user.mongoose.schema';
import {Connection} from 'mongoose';
import {User} from './user';
import {USER_PROVIDER_REGISTRY} from '@rxstack/security';
import {UserProvider} from '@rxstack/platform';

export const APP_USER_PROVIDERS: ProviderDefinition[] = [
  {
    provide: UserService,
    useFactory: (conn: Connection) => new UserService({
      idField: 'username', defaultLimit: 25, model: conn.model('User', userMongooseSchema, 'users')
    }),
    deps: [Connection],
  },
  {
    provide: USER_PROVIDER_REGISTRY,
    useFactory: (service: UserService) => new UserProvider<User>(service),
    deps: [UserService],
    multi: true
  },
];