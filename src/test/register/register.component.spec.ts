import {UserService, AlertService, AuthenticationService} from '../../app/_services';
import {RegisterComponent} from '../../app/register';
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
class LoginStubComponent {
}

describe('Testing Register Component', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let de: DebugElement;
  let userService: UserService;
  let alertService: AlertService;
  let authenticationService: AuthenticationService;
  let routerStub;

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
          {path: 'login', component: LoginStubComponent},
          {path: 'register', component: RegisterComponent}
        ])
      ],
      declarations: [
        RegisterComponent,
        LoginStubComponent
      ],
      providers: [
        AlertService,
        UserService,
        AuthenticationService
      ]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    userService = TestBed.get(UserService);
    alertService = TestBed.get(AlertService);
    authenticationService = TestBed.get(AuthenticationService);

    spyOn(userService, 'createUser')
      .and.returnValue(Observable.of('Success'));

    spyOn(alertService, 'success')
      .and.returnValue('thanh cong');

    spyOn(authenticationService, 'jwt')
      .and.returnValue('thanh cong');
  });

  it('should render component', fakeAsync(() => {
    component.register();
    tick();
    fixture.detectChanges();
    const el = de.query(By.css('h2')).nativeElement;
    expect(el.textContent).toEqual('Register');
  }));

  it('should compile [routerLink] to /login url ',
    async(() => {
      fixture.detectChanges();
      let href = de.query(By.css('#login-route')).nativeElement.getAttribute('href');
      fixture.whenStable().then(() => {
        expect(href).toEqual('/login');
      });
    }));

  it('should navigate /login url', fakeAsync(inject([Router], (router) => {
    spyOn(router, 'navigate');
    component.register();
    tick();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  })));

});


