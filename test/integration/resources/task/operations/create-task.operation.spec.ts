import 'reflect-metadata';
import {configuration} from '@rxstack/configuration';
configuration.initialize(configuration.getRootPath() + '/src/environments');
import {Injector} from 'injection-js';
import {Application, Kernel, Request, Response} from '@rxstack/core';
import {APP_OPTIONS} from '../../../../../src/app/APP_OPTIONS';
import {TOKEN_MANAGER, TokenManagerInterface} from '@rxstack/security';

describe('Integration:Operations:Task:create', () => {

  // Setup application
  const app = new Application(APP_OPTIONS);
  let injector: Injector;
  let kernel: Kernel;
  let tokenManager: TokenManagerInterface;


  before(async () => {
    await app.start();
    injector = app.getInjector();
    kernel = injector.get(Kernel);
    tokenManager = injector.get(TOKEN_MANAGER);
  });

  after(async () => {
    await app.stop();
  });

  it('should call ...', async () => {
    const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_create');
    const request = new Request('HTTP');
    const token = await tokenManager.encode({username: 'admin', roles: ['ROLE_ADMIN']})
    request.headers.set('authorization', 'Bearer ' + token)
    request.body = {
      name: 'test 1',
      assignedTo: 'user'
    };
    const response: Response = await def.handler(request);
    response.statusCode.should.be.equal(201);
  });

});