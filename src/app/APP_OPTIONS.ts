import {ApplicationOptions} from '@rxstack/core';
import {ExpressModule} from '@rxstack/express-server';
import {environment} from '../environments/environment';
import {APP_CONTROLLER_PROVIDERS} from './controllers/APP_CONTROLLER_PROVIDERS';
import {APP_EVENT_LISTENERS_PROVIDERS} from './event-listeners/APP_EVENT_LISTENERS_PROVIDERS';
import {APP_COMMAND_PROVIDERS} from './commands/APP_COMMAND_PROVIDERS';
import {SocketioModule} from '@rxstack/socketio-server';
import {APP_COMMON_PROVIDERS} from './APP_COMMON_PROVIDERS';
import {SecurityModule} from '@rxstack/security';
import {APP_RESOURCE_PROVIDERS} from './resources/APP_RESOURCE_PROVIDERS';
import {MemoryServiceModule} from '@rxstack/memory-service';
import {PlatformModule} from '@rxstack/platform';
import {DataFixtureModule} from '@rxstack/data-fixtures';
import {APP_FIXTURE_PROVIDERS} from './data-fixtures/APP_FIXTURE_PROVIDERS';

export const APP_OPTIONS: ApplicationOptions = {
  imports: [
    ExpressModule.configure(environment.express_server),
    SocketioModule.configure(environment.socketio_server),
    SecurityModule.configure(environment.security),
    DataFixtureModule,
    PlatformModule,
    MemoryServiceModule
  ],
  providers: [
    ...APP_COMMON_PROVIDERS,
    ...APP_COMMAND_PROVIDERS,
    ...APP_CONTROLLER_PROVIDERS,
    ...APP_EVENT_LISTENERS_PROVIDERS,
    ...APP_RESOURCE_PROVIDERS,
    ...APP_FIXTURE_PROVIDERS
  ],
  servers: environment.servers,
  logger: environment.logger,
  console: !!process.env.RXSTACK_CLI
};