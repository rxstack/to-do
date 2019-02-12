import 'reflect-metadata';
import {configuration} from '@rxstack/configuration';
configuration.initialize(configuration.getRootPath() + '/src/environments');
import {Injector} from 'injection-js';
import * as _ from 'lodash';
import {Application, Kernel, Request, Response} from '@rxstack/core';
import {APP_OPTIONS} from '../../../../../src/app/APP_OPTIONS';
import {TOKEN_MANAGER, TokenManagerInterface} from '@rxstack/security';
import {FixtureManager} from '@rxstack/data-fixtures';
import {TaskService} from '../../../../../src/app/resources/task/task.service';
import {BadRequestException} from '@rxstack/exceptions';
import {mapTokenToRequest} from '../../../../utils/map-token-to-request';
import {environment} from '../../../../../src/environments/environment';

describe('Operations:Task', () => {

  // Setup application
  const app = new Application(APP_OPTIONS);
  const adminPayload = {username: 'admin', roles: ['ROLE_ADMIN']};
  const userPayload = {username: 'user', roles: ['ROLE_USER']};
  let injector: Injector;
  let kernel: Kernel;
  let tokenManager: TokenManagerInterface;
  let taskService: TaskService;
  console.log(environment);

  before(async () => {
    await app.start();
    injector = app.getInjector();
    kernel = injector.get(Kernel);
    tokenManager = injector.get(TOKEN_MANAGER);
    taskService = injector.get(TaskService);
  });

  after(async () => {
    await app.stop();
  });

  beforeEach(async () => {
    await injector.get(FixtureManager).execute(true);
  });

  describe('Create', () => {
    it('should create a task with name', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_create');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, adminPayload);
      request.body = {
        name: 'my task'
      };
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(201);
      response.content['name'].should.be.equal('my task');
    });

    it('should create a task with name and assignedTo', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_create');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, adminPayload);
      request.body = {
        name: 'my task',
        assignedTo: 'user'
      };
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(201);
      response.content['assignedTo'].should.be.equal('user');
    });
  });
  describe('Update', () => {
    it('should update a task', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_update');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, adminPayload);
      request.params.set('id', 't-1');
      request.body = {
        name: 'task updated'
      };
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(204);
      const obj = await taskService.find('t-1');
      obj.name.should.be.equal('task updated');
    });
  });

  describe('Patch', () => {
    it('should patch a task with completed set to true', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_patch');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, userPayload);
      request.params.set('id', 't-1');
      request.body = {
        completed: true
      };
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(204);
      const obj = await taskService.find('t-1');
      _.isDate(obj.completedAt).should.be.equal(true);
    });


    it('should patch a task with completed set to false', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_patch');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, userPayload);
      request.params.set('id', 't-1');
      request.body = {
        completed: false
      };
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(204);
      const obj = await taskService.find('t-1');
      _.isDate(obj.completedAt).should.be.equal(false);
    });


    it('should throw exception on patch if task is not found', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_patch');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, userPayload);
      request.params.set('id', 'unknown');
      request.body = {
        completed: true
      };

      let exception: BadRequestException;
      try {
        await def.handler(request);
      } catch (e) {
        exception = e;
      }
      exception.should.be.instanceOf(BadRequestException);
    });
  });

  describe('Get', () => {
    it('should get a task as an admin', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_get');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, adminPayload);
      request.params.set('id', 't-1');
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(200);
    });

    it('should get a task as a user', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_get');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, userPayload);
      request.params.set('id', 't-1');
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(200);
    });
  });

  describe('List', () => {
    it('should list tasks as a user', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_list');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, userPayload);
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(200);
      response.headers.get('x-total').should.be.equal(1);
    });

    it('should list tasks as an admin', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_list');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, adminPayload);
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(200);
      response.headers.get('x-total').should.be.equal(2);
    });

    it('should list tasks with search filter', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_list');
      const request = new Request('HTTP');
      request.params.set('search', 'tas')
      await mapTokenToRequest(request, tokenManager, adminPayload);
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(200);
      response.headers.get('x-total').should.be.equal(2);
    });

    it('should list tasks with completed filter to true', async () => {
      await taskService.updateMany({'_id': {'$eq': 't-1'}}, {'completedAt': new Date()});
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_list');
      const request = new Request('HTTP');
      request.params.set('completed', 'true');
      await mapTokenToRequest(request, tokenManager, adminPayload);
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(200);
      response.headers.get('x-total').should.be.equal(1);
      response.content[0].name = 'task-1';
    });

    it('should list tasks with completed filter to false', async () => {
      await taskService.updateMany({'_id': {'$eq': 't-1'}}, {'completedAt': new Date()});
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_list');
      const request = new Request('HTTP');
      request.params.set('completed', 'false');
      await mapTokenToRequest(request, tokenManager, adminPayload);
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(200);
      response.headers.get('x-total').should.be.equal(1);
      response.content[0].name = 'task-2';
    });
  });

  describe('Remove', () => {
    it('should remove a task', async () => {
      const def = kernel.httpDefinitions.find((item) => item.name === 'app_task_remove');
      const request = new Request('HTTP');
      await mapTokenToRequest(request, tokenManager, adminPayload);
      request.params.set('id', 't-1');
      const response: Response = await def.handler(request);
      response.statusCode.should.be.equal(204);
      const obj = await taskService.find('t-1');
      _.isDate(obj.deletedAt).should.be.equal(true);
    });
  });
});