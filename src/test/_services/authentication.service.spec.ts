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

import {AuthenticationService} from '../../app/_services';
const fakeToken = {
  'headers': {
    'Content-Type': 'application/json',
    'Uid': 'tuanhung@gmail.com',
    'Client': 'jsjdfdfdf92394934',
    'Access-Token': 'sfjdjfjdfjdsf934943432'
  }
};
////////  Tests  /////////////
describe('AuthenticationService (mockBackend)', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AuthenticationService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    })
      .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([AuthenticationService], (service: AuthenticationService) => {
      expect(service instanceof AuthenticationService).toBe(true);
    }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new AuthenticationService(http);
    expect(service instanceof AuthenticationService).toBe(true, 'new service should be ok');
  }));

  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when login', () => {
    let backend: MockBackend;
    let service: AuthenticationService;
    let email = 'tuanhung99@gmail.com';
    let password = 'abababababa';
    let response: Response;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new AuthenticationService(http);
      let options = new ResponseOptions({status: 200, body: fakeToken});
      response = new Response(options);
    }));

    it('should have expected token (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.login(email, password).toPromise()
        .then(token => {
          expect(token.headers['Access-Token']).toBe('sfjdjfjdfjdsf934943432', 'should have expected no. of token');
          expect(JSON.parse(localStorage.getItem('currentUser'))['_body'].headers['Access-Token']).toBe('sfjdjfjdfjdsf934943432');

        });
    })));

    it('should have expected token (Observable.do)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.login(email, password)
        .do(token => {
          expect(token.headers['Access-Token']).toBe('sfjdjfjdfjdsf934943432', 'should have expected no. of token');
          expect(JSON.parse(localStorage.getItem('currentUser'))['_body'].headers['Access-Token']).toBe('sfjdjfjdfjdsf934943432');

        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.login(email, password)
        .do(token => {
          fail('should not respond with token');
        })
        .catch(err => {
          expect(err).toMatch(/Bad response status:/, 'should catch bad response status code');
          return Observable.of(null); // failure is the expected test result
        })
        .toPromise();
    })));
  }); // end of "when login()"

  describe('when get jwt', () => {
    let service: AuthenticationService;
    beforeEach(inject([Http], (http: Http) => {
      service = new AuthenticationService(http);
      localStorage.setItem('currentUser', JSON.stringify(fakeToken));
    }));
    it('should have expected return RequestOptions', () => {
      expect(typeof service.jwt().headers).toBe('object');
    });
    it('should have expected return null when logout', () => {
      service.logout();
      expect(service.jwt()).toBe(undefined);
    });
  }); // end of "when get jwt()"

  describe('when logout', () => {
    let service: AuthenticationService;
    beforeEach(inject([Http], (http: Http) => {
      service = new AuthenticationService(http);
    }));
    it('should have expected remove localStorage when logout', () => {
      service.logout();
      expect(JSON.parse(localStorage.getItem('currentUser'))).toBe(null);
    });
  }); // end of "when logout()"

  describe('when extractData', () => {
    let service: AuthenticationService;
    let res: Response;
    beforeEach(inject([Http], (http: Http) => {
      service = new AuthenticationService(http);
    }));
    it('should have expected throw new Error 100', () => {
      let options = new ResponseOptions({status: 100, body: ''});
      res = new Response(options);
      expect(() => service.extractData(res)).toThrow(new Error('Bad response status: 100'));
    });

    it('should have expected NOT throw new Error 200', () => {
      let options = new ResponseOptions({status: 200, body: ''});
      res = new Response(options);
      expect(() => service.extractData(res)).not.toThrow(new Error('Bad response status: 200'));
    });

    it('should have expected throw new Error 300', () => {
      let options = new ResponseOptions({status: 300, body: ''});
      res = new Response(options);
      expect(() => service.extractData(res)).toThrow(new Error('Bad response status: 300'));
    });
  }); // end of "when extractData()"

  describe('when handleError', () => {
    let service: AuthenticationService;
    let err: any;
    beforeEach(inject([Http], (http: Http) => {
      service = new AuthenticationService(http);
    }));
    it('should have expected return a Promise rejected', () => {
      err = 'fail fail';
      let promise = service.handleError(err);
      expect(promise['__zone_symbol__value']).toBe(err);
    });
  }); // end of "when handleError()"

});
