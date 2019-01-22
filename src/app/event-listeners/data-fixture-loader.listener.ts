import {Injectable} from 'injection-js';
import {ApplicationEvents, BootstrapEvent} from '@rxstack/core';
import {FixtureManager} from '@rxstack/data-fixtures';
import {Observe} from '@rxstack/async-event-dispatcher';

@Injectable()
export class DataFixtureLoaderListener {

  @Observe(ApplicationEvents.BOOTSTRAP)
  async onBootstrap(event: BootstrapEvent): Promise<void> {
    await event.injector.get(FixtureManager).execute(true);
  }
}