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

import {User} from '../../app/_models';
import {PasswordChange} from '../../app/_models';
import {UserService, AuthenticationService} from '../../app/_services';

const makeUserData = () => [
  {id: 41, email: 'bob@gmail.com', password: 'BobBobBob'},
  {id: 42, email: 'carol@gmail.com', password: 'CarolCarolCarol'},
  {id: 46, email: 'stealthy@gmail.com', password: 'StealthyStealthy'}
] as User[];

////////  Tests  /////////////
describe('Http-UserService (mockBackend)', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UserService,
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
    inject([UserService], (service: UserService) => {
      expect(service instanceof UserService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http, AuthenticationService], (http: Http, authenticationService: AuthenticationService) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new UserService(http, authenticationService);
    expect(service instanceof UserService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when getUsers', getUsersTest);
  describe('when createUser', createUserTest);
  describe('when changePassword', changePasswordTest);
  describe('when getCurrentUser', getCurrentUserTest);

  function getUsersTest() {
    let backend: MockBackend;
    let service: UserService;
    let fakeUsers: User[];
    let response: Response;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new UserService(http, authenticationService);
      fakeUsers = makeUserData();
      let options = new ResponseOptions({status: 200, body: fakeUsers});
      response = new Response(options);
    }));

    it('should have expected fake users (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getUsers().toPromise()
        .then(users => {
          expect(users.length).toBe(fakeUsers.length, 'should have expected no. of heroes');
        });
    })));

    it('should have expected fake Users (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getUsers()
        .do(Users => {
          expect(Users.length).toBe(fakeUsers.length, 'should have expected no. of Users');
        })
        .toPromise();
    })));

    it('should be OK returning no Users', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: []}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getUsers()
        .do(Users => {
          expect(Users.length).toBe(0, 'should have no Users');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getUsers()
        .do(Users => {
          fail('should not respond with Users');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "when getUsersTest"

  function createUserTest() {
    let backend: MockBackend;
    let service: UserService;
    let response: Response;
    let fakeUser: User;
    let userToCreate: { id: number, email: 'bob@gmail.com', password: 'BobBobBob' };

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new UserService(http, authenticationService);
      fakeUser = makeUserData()[0];
      let options = new ResponseOptions({status: 200, body: fakeUser});
      response = new Response(options);
    }));

    it('should have expected fake user (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.createUser(userToCreate).toPromise()
        .then(user => {
          expect(user.id).toBe(fakeUser.id, 'should have expected User id');
          expect(user.email).toBe(fakeUser.email, 'should have expected User email');
        });
    })));

    it('should have expected fake User (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.createUser(userToCreate)
        .do(User => {
          expect(User.id).toBe(fakeUser.id, 'should have expected User id');
          expect(User.email).toBe(fakeUser.email, 'should have expected User email');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.createUser(userToCreate)
        .do(Users => {
          fail('should not respond with User');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "when createUserTest"

  function changePasswordTest() {
    let backend: MockBackend;
    let service: UserService;
    let response: Response;
    let responsePassword: PasswordChange;
    let changepassword: PasswordChange = {password: '1234abcd', password_confirmation: '1234abcd'};

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new UserService(http, authenticationService);
      responsePassword = changepassword;
      let options = new ResponseOptions({status: 200, body: responsePassword});
      response = new Response(options);
    }));

    it('should have expected fake user (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.changePassword(changepassword).toPromise()
        .then(res => {
          expect(res).toBe(responsePassword, 'should have expected changepassword');
        })
    })));

    it('should have expected fake User (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.changePassword(changepassword)
        .do(res => {
          expect(res).toBe(responsePassword, 'should have expected changepassword');
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.changePassword(changepassword)
        .do(res => {
          fail('should not respond with Password');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  } // end of "when changePasswordTest"

  function getCurrentUserTest() {
    let backend: MockBackend;
    let service: UserService;

    beforeEach(inject([Http, XHRBackend, AuthenticationService], (http: Http, be: MockBackend, authenticationService: AuthenticationService) => {
      backend = be;
      service = new UserService(http, authenticationService);
    }));

    it('should return currentUser.headers when getCurrentUser', () => {
      let currentUserUid = service.getCurrentUser();
      expect(currentUserUid).toEqual('fakeUid')
    });
  } // end of "when getCurrentUserTest"
});
