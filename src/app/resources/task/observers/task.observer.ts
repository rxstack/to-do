import {Injectable} from 'injection-js';
import {ApplicationEvents, BootstrapEvent} from '@rxstack/core';
import {AsyncEventDispatcher, Observe} from '@rxstack/async-event-dispatcher';
import {rename, restrictToAuthenticatedUser, softDelete} from '@rxstack/platform-callbacks';
import {OperationCallback} from '@rxstack/platform';

@Injectable()
export class TaskObserver {

  @Observe(ApplicationEvents.BOOTSTRAP)
  onBootstrap(event: BootstrapEvent): void {
    const dispatcher: AsyncEventDispatcher = event.injector.get(AsyncEventDispatcher);
    const eventNames = [
      'app_task_create',
      'app_task_list',
      'app_task_get'
    ];
    this.registerCallbacks(
      dispatcher, eventNames.concat(['app_task_patch', 'app_task_update', 'app_task_remove']),
      restrictToAuthenticatedUser(), 'pre_execute', 100);

    this.registerCallbacks(dispatcher, eventNames, rename('_id', 'id'), 'post_execute');
    this.registerCallbacks(dispatcher,
      eventNames.concat(['app_task_patch', 'app_task_update', 'app_task_remove']),
      softDelete({addOnCreate: true}), 'pre_execute', -100);
  }

  private registerCallbacks(dispatcher: AsyncEventDispatcher, eventNames: string[],
                            callback: OperationCallback, type: string, priority = 0) {
    eventNames.forEach((eventName) =>
      dispatcher.addListener(eventName + '.' + type, callback, priority));
  }
}