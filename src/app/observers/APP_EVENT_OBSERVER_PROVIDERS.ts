import {ProviderDefinition} from '@rxstack/core';
import {ExpressServerConfigurationObserver} from './express-server-configuration.observer';

export const APP_EVENT_OBSERVER_PROVIDERS: ProviderDefinition[] = [
  { provide: ExpressServerConfigurationObserver, useClass: ExpressServerConfigurationObserver },
];