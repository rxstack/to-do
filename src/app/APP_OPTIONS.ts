import {ApplicationOptions} from '@rxstack/core';
import {ExpressModule} from '@rxstack/express-server';
import {environment} from '../environments/environment';
import {SocketioModule} from '@rxstack/socketio-server';
import {SecurityModule} from '@rxstack/security';
import {APP_RESOURCE_PROVIDERS} from './resources/APP_RESOURCE_PROVIDERS';
import {MemoryServiceModule} from '@rxstack/memory-service';
import {PlatformModule} from '@rxstack/platform';
import {DataFixtureModule} from '@rxstack/data-fixtures';
import {APP_FIXTURE_PROVIDERS} from './data-fixtures/APP_FIXTURE_PROVIDERS';
import {MongooseServiceModule} from '@rxstack/mongoose-service';
import {APP_EVENT_OBSERVER_PROVIDERS} from './observers/APP_EVENT_OBSERVER_PROVIDERS';

export const APP_OPTIONS: ApplicationOptions = {
  imports: [
    ExpressModule.configure(environment.express_server),
    SocketioModule.configure(environment.socketio_server),
    SecurityModule.configure(environment.security),
    DataFixtureModule,
    PlatformModule,
    MemoryServiceModule,
    MongooseServiceModule.configure(environment.mongoose)
  ],
  providers: [
    ...APP_EVENT_OBSERVER_PROVIDERS,
    ...APP_RESOURCE_PROVIDERS,
    ...APP_FIXTURE_PROVIDERS
  ],
  servers: environment.servers,
  logger: environment.logger,
  console: !!process.env.RXSTACK_CLI
};