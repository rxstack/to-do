import {ProviderDefinition} from '@rxstack/core';
import {ExpressServerConfigurationListener} from './express-server-configuration.listener';
import {DataFixtureLoaderListener} from './data-fixture-loader.listener';

export const APP_EVENT_LISTENERS_PROVIDERS: ProviderDefinition[] = [
  { provide: ExpressServerConfigurationListener, useClass: ExpressServerConfigurationListener },
  { provide: DataFixtureLoaderListener, useClass: DataFixtureLoaderListener },
];