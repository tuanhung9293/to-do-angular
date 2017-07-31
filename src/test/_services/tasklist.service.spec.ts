import {
  async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import {Tasklist, Authen, Todo} from '../../app/_models';

import {TasklistService, AuthenticationService} from '../../app/_services';

const makeTasklistData = () => [
  {id: 41, name: 'tasklist--1', user: 'bob@gmail.com'},
  {id: 42, name: 'tasklist--2', user: 'carol@gmail.com'},
  {id: 46, name: 'tasklist--3', user: 'stealthy@gmail.com'}
] as Tasklist[];

const makeAuthensData = () => [
  {user_id: 41, task_list_id: 33, is_write: true},
  {user_id: 42, task_list_id: 34, is_write: false},
  {user_id: 44, task_list_id: 36, is_write: false},
  {user_id: 47, task_list_id: 38, is_write: true}
] as Authen[];

const makeTodosData = () => [
  {id: 1, name: 'todo1', done: true},
  {id: 3, name: 'todo3', done: false},
  {id: 4, name: 'todotodo4', done: false},
  {id: 7, name: 'todo5', done: true}
] as Todo[];

////////  Tests  /////////////
describe('Http-TasklistService (mockBackend)', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TasklistService,
        AuthenticationService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();

    let fakeLocalStorage = {
      'headers': {
        'Uid': 'fakeUid',
        'Client': 'fakeClient',
        'Access-Token': 'fakeAccess-Token'
      }
    };
    localStorage.setItem('currentUser', JSON.stringify(fakeLocalStorage));
  }));

  it('can instantiate service when inject service',
    inject([TasklistService], (service: TasklistService) => {
      expect(service instanceof TasklistService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http, AuthenticationService], (http: Http, authenticationService: AuthenticationService) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new TasklistService(http, authenticationService);
    expect(service instanceof TasklistService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when getTasklists', testGetTasklists);
  describe('when getTasklist', tetGetTasklist);
  describe('when getTasklistsAuthorized', testGetTasklistsAuthorized);
  describe('when getAuthorizedUsers', testGetAuthorizedUsers);
  describe('when createAuthorizedUser', testCreateAuthorizedUser);
  describe('when updateAuthorizedUser', testUpdateAuthorizedUser);
  describe('when deleteAuthorizedUser', testDeleteAuthorizedUser);
  describe('when createTasklist', testCreateTasklist);
  describe('when deleteTasklist', testDeleteTasklist);
  describe('when updateTasklist', testUpdateTasklist);
  describe('when getTodos', testGetTodos);
  describe('when addTodo', testAddTodo);
  describe('when updateTodo', testUpdateTodo);
  describe('when deleteTodo', testDeleteTodo);

  function testGetTasklists() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeTasklists: Tasklist[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeTasklists = makeTasklistData();
      let options = new ResponseOptions({status: 200, body: fakeTasklists});
      response = new Response(options);
    }));

    it('should have expected fake Tasklists (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getTasklists().toPromise()
        .then(Tasklists => {
          expect(Tasklists.length).toBe(fakeTasklists.length, 'should have expected no. of tasklists');
        });
    })));

    it('should have expected fake Tasklists (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getTasklists()
        .do(Tasklists => {
          expect(Tasklists.length).toBe(fakeTasklists.length, 'should have expected no. of Tasklists');
        })
        .toPromise();
    })));


    it('should be OK returning no Tasklists', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: []}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getTasklists()
        .do(Tasklists => {
          expect(Tasklists.length).toBe(0, 'should have no Tasklists');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getTasklists()
        .do(Tasklists => {
          fail('should not respond with Tasklists');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  }// end of "when getTasklists"

  function tetGetTasklist() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeTasklist: Tasklist;
    let tasklist_id: number;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeTasklist = makeTasklistData()[0];
      tasklist_id = 1;
      let options = new ResponseOptions({status: 200, body: fakeTasklist});
      response = new Response(options);
    }));

    it('should have expected fake Tasklist (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getTasklist(tasklist_id).toPromise()
        .then(tasklist => {
          expect(tasklist).toBe(fakeTasklist, 'should have expected no. of tasklists');
        });
    })));

    it('should have expected fake Tasklist (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getTasklist(tasklist_id)
        .do(tasklist => {
          expect(tasklist).toBe(fakeTasklist, 'should have expected no. of Tasklist');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getTasklist(tasklist_id)
        .do(tasklist => fail('should not respond with Tasklist'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "when tetGetTasklist"

  function testGetTasklistsAuthorized() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeTasklistsAuthorized: Tasklist[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeTasklistsAuthorized = makeTasklistData();
      let options = new ResponseOptions({status: 200, body: fakeTasklistsAuthorized});
      response = new Response(options);
    }));

    it('should have expected fake Tasklist (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getTasklistsAuthorized().toPromise()
        .then(tasklists => {
          expect(tasklists.length).toBe(fakeTasklistsAuthorized.length, 'should have expected no. of tasklists');
        });
    })));

    it('should have expected fake Tasklist (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getTasklistsAuthorized()
        .do(tasklists => {
          expect(tasklists.length).toBe(fakeTasklistsAuthorized.length, 'should have expected no. of Tasklist');
        })
        .toPromise();
    })));

    it('should be OK returning no TasklistsAuthorized', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: []}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getTasklistsAuthorized()
        .do(tasklists => {
          expect(tasklists.length).toBe(0, 'should have no TasklistsAuthorized');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getTasklistsAuthorized()
        .do(tasklist => fail('should not respond with Tasklist'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "when testGetTasklistsAuthorized"

  function testGetAuthorizedUsers() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeAuthorizedUsers: Authen[];
    let tasklist_id: number;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeAuthorizedUsers = makeAuthensData();
      tasklist_id = 1;
      let options = new ResponseOptions({status: 200, body: fakeAuthorizedUsers});
      response = new Response(options);
    }));

    it('should have expected fake AuthorizedUsers (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getAuthorizedUsers(tasklist_id).toPromise()
        .then(users => {
          expect(users.length).toBe(fakeAuthorizedUsers.length, 'should have expected no. of AuthorizedUsers');
        });
    })));

    it('should have expected fake AuthorizedUsers (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getAuthorizedUsers(tasklist_id)
        .do(users => {
          expect(users.length).toBe(fakeAuthorizedUsers.length, 'should have expected no. of AuthorizedUsers');
        })
        .toPromise();
    })));

    it('should be OK returning no TasklistsAuthorized', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: []}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getAuthorizedUsers(tasklist_id)
        .do(users => {
          expect(users.length).toBe(0, 'should have no TasklistsAuthorized');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getAuthorizedUsers(tasklist_id)
        .do(users => fail('should not respond with AuthorizedUsers'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "when testGetAuthorizedUsers"

  function testCreateAuthorizedUser() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeAuthorizedUsers: Authen;
    let tasklist_id: number;
    let user_id: number;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeAuthorizedUsers = makeAuthensData()[0];
      tasklist_id = 1;
      user_id = 1;
      let options = new ResponseOptions({status: 200, body: fakeAuthorizedUsers});
      response = new Response(options);
    }));

    it('should have expected fake AuthorizedUsers (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.createAuthorizedUser(tasklist_id, user_id).toPromise()
        .then(users => {
          expect(users).toBe(fakeAuthorizedUsers, 'should have expected no. of AuthorizedUsers');
        });
    })));

    it('should have expected fake AuthorizedUsers (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.createAuthorizedUser(tasklist_id, user_id)
        .do(users => {
          expect(users).toBe(fakeAuthorizedUsers, 'should have expected no. of AuthorizedUsers');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.createAuthorizedUser(tasklist_id, user_id)
        .do(users => fail('should not respond with AuthorizedUsers'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "when testCreateAuthorizedUser"

  function testUpdateAuthorizedUser() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeUpdatedAuthorizedUsers: Authen;
    let tasklist_id: number;
    let user_id: number;
    let is_write: boolean;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeUpdatedAuthorizedUsers = makeAuthensData()[0];
      tasklist_id = 1;
      user_id = 1;
      is_write = true;
      let options = new ResponseOptions({status: 200, body: fakeUpdatedAuthorizedUsers});
      response = new Response(options);
    }));

    it('should have expected fake AuthorizedUsers (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.updateAuthorizedUser(tasklist_id, user_id, is_write).toPromise()
        .then(users => {
          expect(users).toBe(fakeUpdatedAuthorizedUsers, 'should have expected no. of AuthorizedUsers');
        });
    })));

    it('should have expected fake AuthorizedUsers (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.updateAuthorizedUser(tasklist_id, user_id, is_write)
        .do(users => {
          expect(users).toBe(fakeUpdatedAuthorizedUsers, 'should have expected no. of AuthorizedUsers');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.updateAuthorizedUser(tasklist_id, user_id, is_write)
        .do(users => fail('should not respond with AuthorizedUsers'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "when testUpdateAuthorizedUser"

  function testDeleteAuthorizedUser() {
    let backend: MockBackend;
    let service: TasklistService;
    let tasklist_id: number;
    let user_id: number;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      tasklist_id = 1;
      user_id = 1;
      let options = new ResponseOptions({status: 200, body: null});
      response = new Response(options);
    }));

    it('should have expected AuthorizedUser deleted (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.deleteAuthorizedUser(tasklist_id, user_id).toPromise()
        .then(res => {
          expect(res).toBe(null, 'should have expected AuthorizedUser deleted ');
        });
    })));

    it('should have expected AuthorizedUser deleted (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.deleteAuthorizedUser(tasklist_id, user_id)
        .do(res => {
          expect(res).toBe(null, 'should have expected AuthorizedUser deleted ');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.deleteAuthorizedUser(tasklist_id, user_id)
        .do(users => fail('should not respond with deleteAuthorizedUser'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "testDeleteAuthorizedUser"

  function testCreateTasklist() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeCreatedTasklist: Tasklist;
    let tasklistName: string;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeCreatedTasklist = makeTasklistData()[1];
      tasklistName = 'tasklist--123';
      let options = new ResponseOptions({status: 200, body: fakeCreatedTasklist});
      response = new Response(options);
    }));

    it('should have expected fake CreatedTasklist (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.createTasklist(tasklistName).toPromise()
        .then(tasklist => {
          expect(tasklist.name).toBe(fakeCreatedTasklist.name, 'should have expected no. of CreatedTasklist');
        });
    })));

    it('should have expected fake CreatedTasklist (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.createTasklist(tasklistName)
        .do(tasklist => {
          expect(tasklist.name).toBe(fakeCreatedTasklist.name, 'should have expected no. of CreatedTasklist');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.createTasklist(tasklistName)
        .do(tasklist => fail('should not respond with CreatedTasklist'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "testCreateTasklist"

  function testDeleteTasklist() {
    let backend: MockBackend;
    let service: TasklistService;
    let tasklist_id: number;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      tasklist_id = 1;
      let options = new ResponseOptions({status: 200, body: null});
      response = new Response(options);
    }));

    it('should have expected fake DeletedTasklist (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.deleteTasklist(tasklist_id).toPromise()
        .then(tasklist => {
          expect(tasklist).toBe(null, 'should have expected no. of DeletedTasklist');
        });
    })));

    it('should have expected fake DeletedTasklist (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.deleteTasklist(tasklist_id)
        .do(tasklist => {
          expect(tasklist).toBe(null, 'should have expected no. of DeletedTasklist');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.deleteTasklist(tasklist_id)
        .do(tasklist => fail('should not respond with DeletedTasklist'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "testDeleteTasklist"

  function testUpdateTasklist() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeUpdatedTasklist: Tasklist;
    let tasklist_id: number;
    let tasklistName: string;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeUpdatedTasklist = makeTasklistData()[0];
      tasklist_id = 1;
      tasklistName = 'change Name';
      let options = new ResponseOptions({status: 200, body: fakeUpdatedTasklist});
      response = new Response(options);
    }));

    it('should have expected fake Tasklists (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.updateTasklist(tasklist_id, tasklistName).toPromise()
        .then(tasklist => {
          expect(tasklist).toBe(fakeUpdatedTasklist, 'should have expected no. of Tasklists');
        });
    })));

    it('should have expected fake Tasklists (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.updateTasklist(tasklist_id, tasklistName)
        .do(tasklist => {
          expect(tasklist).toBe(fakeUpdatedTasklist, 'should have expected no. of Tasklists');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.updateTasklist(tasklist_id, tasklistName)
        .do(tasklist => fail('should not respond with Tasklists'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "testUpdateTasklist"

  function testGetTodos() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeTodos: Todo[];
    let tasklist_id: number;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeTodos = makeTodosData();
      tasklist_id = 1;
      let options = new ResponseOptions({status: 200, body: fakeTodos});
      response = new Response(options);
    }));

    it('should have expected fake Todos (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getTodos(tasklist_id).toPromise()
        .then(Todos => {
          expect(Todos.length).toBe(fakeTodos.length, 'should have expected no. of todos');
        });
    })));

    it('should have expected fake Todos (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getTodos(tasklist_id)
        .do(Todos => {
          expect(Todos.length).toBe(fakeTodos.length, 'should have expected no. of Todos');
        })
        .toPromise();
    })));

    it('should be OK returning no Todos', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: []}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getTodos(tasklist_id)
        .do(todos => {
          expect(todos.length).toBe(0, 'should have no Todos');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getTodos(tasklist_id)
        .do(Todos => {
          fail('should not respond with Todos');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  }// end of "testGetTodos"

  function testAddTodo() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeCreatedTodo: Todo;
    let tasklist_id: number;
    let todoName: string;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeCreatedTodo = makeTodosData()[1];
      tasklist_id = 2;
      todoName = 'todo--123';
      let options = new ResponseOptions({status: 200, body: fakeCreatedTodo});
      response = new Response(options);
    }));

    it('should have expected fake CreatedTodo (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.addTodo(tasklist_id, todoName).toPromise()
        .then(todo => {
          expect(todo.name).toBe(fakeCreatedTodo.name, 'should have expected no. of CreatedTodo');
        });
    })));

    it('should have expected fake CreatedTodo (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.addTodo(tasklist_id, todoName)
        .do(todo => {
          expect(todo.name).toBe(fakeCreatedTodo.name, 'should have expected no. of CreatedTodo');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.addTodo(tasklist_id, todoName)
        .do(todo => fail('should not respond with CreatedTodo'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "testAddTodo"

  function testUpdateTodo() {
    let backend: MockBackend;
    let service: TasklistService;
    let fakeUpdatedTodo: Todo;
    let tasklist_id: number;
    let todo_id: number;
    let todoName: string;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      fakeUpdatedTodo = makeTodosData()[0];
      tasklist_id = 1;
      todo_id = 1;
      todoName = 'change Name';
      let options = new ResponseOptions({status: 200, body: fakeUpdatedTodo});
      response = new Response(options);
    }));

    it('should have expected fake Todos (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.updateTodo(tasklist_id, todo_id).toPromise()
        .then(todo => {
          expect(todo).toBe(fakeUpdatedTodo, 'should have expected no. of Todos');
        });
    })));

    it('should have expected fake Todos (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.updateTodo(tasklist_id, todo_id)
        .do(todo => {
          expect(todo).toBe(fakeUpdatedTodo, 'should have expected no. of Todos');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.updateTodo(tasklist_id, todo_id)
        .do(todo => fail('should not respond with Todos'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "testUpdateTodo"

  function testDeleteTodo() {
    let backend: MockBackend;
    let service: TasklistService;
    let tasklist_id: number;
    let todo_id: number;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new TasklistService(http, authenticationService);
      tasklist_id = 1;
      todo_id = 1;
      let options = new ResponseOptions({status: 200, body: null});
      response = new Response(options);
    }));

    it('should have expected fake DeletedTodo (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.deleteTodo(tasklist_id, todo_id).toPromise()
        .then(tasklist => {
          expect(tasklist).toBe(null, 'should have expected no. of DeletedTodo');
        });
    })));

    it('should have expected fake DeletedTodo (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.deleteTodo(tasklist_id, todo_id)
        .do(tasklist => {
          expect(tasklist).toBe(null, 'should have expected no. of DeletedTodo');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.deleteTodo(tasklist_id, todo_id)
        .do(todo => fail('should not respond with DeletedTodo'))
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "testDeleteTodo"

});


