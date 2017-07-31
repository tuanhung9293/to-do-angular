import {UserService, AlertService, AuthenticationService} from '../../../app/_services';
import {ProfileComponent} from '../../../app/dashboard/profile';
import {Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {Component, DebugElement} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import 'rxjs/add/observable/throw';

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
class TasklistStubComponent {
}

describe('Testing ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;
  let de: DebugElement;
  let userService: UserService;
  let alertService: AlertService;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        RouterModule,
        RouterTestingModule.withRoutes([
          {path: '', component: TasklistStubComponent},
          {path: 'profile', component: ProfileComponent}
        ])
      ],
      declarations: [
        ProfileComponent,
        TasklistStubComponent
      ],
      providers: [
        AlertService,
        UserService,
        AuthenticationService
      ]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    userService = TestBed.get(UserService);
    alertService = TestBed.get(AlertService);
    authenticationService = TestBed.get(AuthenticationService);

    spyOn(alertService, 'success')
      .and.returnValue('run success');

    spyOn(authenticationService, 'jwt')
      .and.returnValue('run success');
  });

  it('should render ProfileComponent', fakeAsync(() => {
    const el = de.query(By.css('h3')).nativeElement;
    expect(el.textContent).toMatch('Welcome');
  }));

  it('should compile [routerLink] to /login url ',
    async(() => {
      spyOn(userService, 'getCurrentUser')
        .and.returnValue('tuanhung123');

      fixture.detectChanges();
      let href = de.query(By.css('#profile-logout-route')).nativeElement.getAttribute('href');
      fixture.whenStable().then(() => {
        expect(href).toEqual('/login');
      });
    }));

  describe('When ProfileComponent run ngOnInit()', () => {
    it('should "current_user" be UNDEFINED when begin ProfileComponent', () => {
      expect(component.current_user).toBeUndefined();
    });

    it('should getCurrentUser() when run ngOnInit()', fakeAsync(() => {
      spyOn(userService, 'getCurrentUser')
        .and.returnValue('tuanhung123');
      tick();
      fixture.detectChanges();
      expect(component.current_user).toEqual('tuanhung123');

      const el = de.query(By.css('h3')).nativeElement;
      expect(el.textContent).toEqual('Welcome tuanhung123');
    }));
  });

  describe('When ProfileComponent run changePassword()', () => {
    it('should navigate root url when changePassword() success', fakeAsync(inject([Router], (router) => {
      spyOn(userService, 'getCurrentUser')
        .and.returnValue('tuanhung123');

      spyOn(userService, 'changePassword')
        .and.returnValue(Observable.of('run success'));

      spyOn(router, 'navigate');

      component.changePassword();
      tick();
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    })));

    it('should run alertService.success() when changePassword() success', fakeAsync(() => {
      spyOn(userService, 'getCurrentUser')
        .and.returnValue('tuanhung123');

      spyOn(userService, 'changePassword')
        .and.returnValue(Observable.of('run success'));

      component.changePassword();
      tick();
      fixture.detectChanges();
      expect(alertService.success).toHaveBeenCalled();
    }));

    it('should run alertService.error() when changePassword() fail', fakeAsync(() => {
      spyOn(userService, 'getCurrentUser')
        .and.returnValue('tuanhung123');

      spyOn(userService, 'changePassword')
        .and.returnValue(Observable.throw({status: 400}));

      spyOn(alertService, 'error')
        .and.returnValue('run success');

      component.changePassword();
      tick();
      fixture.detectChanges();
      expect(alertService.error).toHaveBeenCalled();
    }));
  });
});


