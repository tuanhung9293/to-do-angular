import {UserService, AlertService, AuthenticationService} from '../../app/_services';
import {LoginComponent} from '../../app/login';
import {Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {Component, DebugElement} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {
  async,
  TestBed,
  fakeAsync,
  tick, ComponentFixture,
  inject
} from '@angular/core/testing';

@Component({
  template: ''
})
class RegisterStubComponent {
}
let fixture: ComponentFixture<LoginComponent>;
let component: LoginComponent;
let de: DebugElement;
let alertService: AlertService;
let authenticationService: AuthenticationService;
let routerStub;

describe('LoginComponent begin run', () => {
  beforeEach(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        RouterModule,
        RouterTestingModule.withRoutes([
          {path: 'register', component: RegisterStubComponent},
          {path: 'login', component: LoginComponent}
        ])
      ],
      declarations: [
        LoginComponent,
        RegisterStubComponent
      ],
      providers: [
        AlertService,
        AuthenticationService
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    alertService = TestBed.get(AlertService);
    authenticationService = TestBed.get(AuthenticationService);

  });


  it('should render component', fakeAsync(() => {
    const el = de.query(By.css('h2')).nativeElement;
    expect(el.textContent).toEqual('Login');
  }));

  it('should "loading" property = true when begin LoginComponent', fakeAsync(() => {
    expect(component.loading).toEqual(false);
  }));

  it('should compile [routerLink] to /regisster url ',
    async(() => {
      fixture.detectChanges();
      let href = de.query(By.css('#register-route')).nativeElement.getAttribute('href');
      fixture.whenStable().then(() => {
        expect(href).toEqual('/register');
      });
    }));

  describe('LoginComponent when ngOnInit()', () => {
    it('should clear localStorage before login', fakeAsync(() => {
      localStorage.setItem('currentUser', 'have value');
      spyOn(authenticationService, 'logout')
        .and.callFake(() => localStorage.removeItem('currentUser'));
      tick();
      fixture.detectChanges();
      expect(JSON.parse(localStorage.getItem('currentUser'))).toBe(null);
    }));
  });


  describe('LoginComponent when login()', () => {
    it('should "loading" property = true when login() be trigger', (() => {
      component.login();
      expect(component.loading).toEqual(true);
    }));

    it('should navigate root url when login success', fakeAsync(inject([Router], (router) => {
      spyOn(authenticationService, 'login')
        .and.returnValue(Observable.of('run success'));

      spyOn(authenticationService, 'jwt')
        .and.returnValue('run success');

      spyOn(alertService, 'success')
        .and.returnValue('run success');

      spyOn(router, 'navigate');

      component.login();
      tick();
      fixture.detectChanges();

      expect(router.navigate).toHaveBeenCalledWith(['/']);
    })));

    it('should set loading = false when login error', fakeAsync(() => {
      spyOn(authenticationService, 'login')
        .and.returnValue(Observable.throw({status: 400}));
      spyOn(authenticationService, 'jwt')
        .and.returnValue('run success');
      spyOn(alertService, 'error')
        .and.returnValue('run success');
      component.login();

      tick();
      fixture.detectChanges();
      expect(component.loading).toBeFalsy();
    }));

    it('should run  alertService.error when login error', fakeAsync(() => {
      spyOn(authenticationService, 'login')
        .and.returnValue(Observable.throw({status: 400}));
      spyOn(authenticationService, 'jwt')
        .and.returnValue('run success');
      spyOn(alertService, 'error')
        .and.returnValue('run success');
      component.login();

      tick();
      fixture.detectChanges();
      expect(alertService.error).toHaveBeenCalled();
    }));
  });

});


