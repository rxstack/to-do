import {ProviderDefinition} from '@rxstack/core';
import {TaskFixture} from './task-fixture';
import {FIXTURE_REGISTRY, PURGER_SERVICE} from '@rxstack/data-fixtures';
import {UserFixture} from './user-fixture';
import {MongoosePurger} from '@rxstack/mongoose-service';

export const APP_FIXTURE_PROVIDERS: ProviderDefinition[] = [
  { provide: PURGER_SERVICE, useClass: MongoosePurger },
  { provide: FIXTURE_REGISTRY, useClass: UserFixture, multi: true },
  { provide: FIXTURE_REGISTRY, useClass: TaskFixture, multi: true }
];