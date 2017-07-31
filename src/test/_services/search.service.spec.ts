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

import {TodoSearch} from '../../app/_models';
import {SearchService, AuthenticationService} from '../../app/_services';

const makeTodoData = () => [
  {id: 41, name: 'tasklist no 1', task_list_id: 1},
  {id: 42, name: 'tasklist no 2', task_list_id: 2},
  {id: 46, name: 'tasklist no 3', task_list_id: 3},
  {id: 47, name: 'tasklist no 4', task_list_id: 4}
] as TodoSearch[];

////////  Tests  /////////////
describe('Http-SearchService (mockBackend)', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SearchService,
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
    inject([SearchService], (service: SearchService) => {
      expect(service instanceof SearchService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http, AuthenticationService], (http: Http, authenticationService: AuthenticationService) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new SearchService(http, authenticationService);
    expect(service instanceof SearchService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when searchTodo', () => {
    let backend: MockBackend;
    let service: SearchService;
    let fakeTodos: TodoSearch[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new SearchService(http, authenticationService);
      fakeTodos = makeTodoData();
      let options = new ResponseOptions({status: 200, body: fakeTodos});
      response = new Response(options);
    }));

    it('should have expected fake users (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.searchTodo('search_string').toPromise()
        .then(users => {
          expect(users.length).toBe(fakeTodos.length, 'should have expected no. of heroes');
        });
    })));

    it('should have expected fake Todos (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.searchTodo('search_string')
        .do(Todos => {
          expect(Todos.length).toBe(fakeTodos.length, 'should have expected no. of Todos');
        })
        .toPromise();
    })));

    it('should be OK returning no. Todos', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: []}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.searchTodo('search_string')
        .do(Todos => {
          expect(Todos.length).toBe(0, 'should have no Todos');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.searchTodo('search_string')
        .do(Todos => {
          fail('should not respond with Todos');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  }); // end of "when searchTodoTest"
});
