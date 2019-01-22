import {ProviderDefinition} from '@rxstack/core';
import {TaskFixture} from './task-fixture';
import {FIXTURE_REGISTRY} from '@rxstack/data-fixtures';
import {UserFixture} from './user-fixture';

export const APP_FIXTURE_PROVIDERS: ProviderDefinition[] = [
  { provide: FIXTURE_REGISTRY, useClass: UserFixture, multi: true },
  { provide: FIXTURE_REGISTRY, useClass: TaskFixture, multi: true }
];