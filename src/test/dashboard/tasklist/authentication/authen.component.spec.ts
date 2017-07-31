import {DebugElement} from '@angular/core';
import {UserService, TasklistService, AuthenticationService} from '../../../../app/_services';

import {HttpModule} from '@angular/http';
import {By} from '@angular/platform-browser';

import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';


import {AuthenComponent} from '../../../../app/dashboard/tasklist/authentication';
import * as CONST from './const-to-test-authen';
import {Ng2OrderModule} from 'ng2-order-pipe';

import {
  TestBed,
  fakeAsync,
  tick, ComponentFixture,
} from '@angular/core/testing';

describe('Testing AuthenComponent', () => {
  let fixture: ComponentFixture<AuthenComponent>;
  let component: AuthenComponent;
  let de: DebugElement;
  let userService: UserService;
  let authenticationService: AuthenticationService;
  let tasklistService: TasklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        Ng2OrderModule
      ],
      declarations: [
        AuthenComponent
      ],
      providers: [
        UserService,
        TasklistService,
        AuthenticationService
      ]
    });

    fixture = TestBed.createComponent(AuthenComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    userService = TestBed.get(UserService);
    tasklistService = TestBed.get(TasklistService);
    authenticationService = TestBed.get(AuthenticationService);
    spyOn(authenticationService, 'jwt')
      .and.returnValue('run success');

    component.authorizedUsers = CONST.AUTHORS;
    component.tasklist = CONST.TASKLISTS[0];
  });

  it('should render AuthenComponent', () => {
    const el = de.query(By.css('#control-share')).nativeElement;
    fixture.detectChanges();
    expect(el.textContent).toMatch('Share All Actions');
  });

  it('should have init value when AuthenComponent begin', fakeAsync(() => {
    spyOn(component, 'ngOnInit')
      .and.returnValue('run success');
    tick();
    fixture.detectChanges();
    expect(component.users).toBeUndefined();
    expect(component.authorizedUsers).toBeDefined();
    expect(component.tasklist).toBeDefined();
  }));

  describe('When ngOnInit()', ngOnInitTest);
  describe('When getUsers()', getUsersTest);
  describe('When createAuthorizedUser()', createAuthorizedUserTest);
  describe('When deleteAuthorizedUser()', deleteAuthorizedUserTest);
  describe('When updateAuthorizedUser()', updateAuthorizedUserTest);

  function ngOnInitTest() {
    it('should run component.ngOnInit() when create AuthenComponent', () => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      fixture.detectChanges();
      expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should run component.getUsers() when run component.ngOnInit()', () => {
      spyOn(component, 'getUsers')
        .and.returnValue('run success');
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.getUsers).toHaveBeenCalled();
    });
  }

  function getUsersTest() {
    beforeEach(() => {
      spyOn(userService, 'getCurrentUser')
        .and.returnValue([CONST.USERS[0].email]);
    });

    it('should return users when getUsers() success', fakeAsync(() => {
      spyOn(userService, 'getUsers')
        .and.returnValue(Observable.of(CONST.USERS));

      tick();
      fixture.detectChanges();
      expect(component.users).toBeDefined();
    }));

    it('should filter users when getUsers() success', fakeAsync(() => {
      let authors_length = component.authorizedUsers.length;
      let response_userService_getUsers = CONST.USERS.length;
      spyOn(userService, 'getUsers')
        .and.returnValue(Observable.of(CONST.USERS));

      tick();
      fixture.detectChanges();
      expect(component.users.length).toEqual(response_userService_getUsers - authors_length - 1);
    }));

    it('should change "user_emai" of authorizedUsers getUsers() success', fakeAsync(() => {
      component.authorizedUsers.forEach(item => item.user_email = null);
      spyOn(userService, 'getUsers')
        .and.returnValue(Observable.of(CONST.USERS));
      expect(component.authorizedUsers[0].user_email).toBeNull();
      expect(component.authorizedUsers[1].user_email).toBeNull();

      tick();
      fixture.detectChanges();
      expect(component.authorizedUsers[0].user_email).not.toBeNull();
      expect(component.authorizedUsers[1].user_email).not.toBeNull();
    }));

    it('should NOT return users when getUsers() error', fakeAsync(() => {
      spyOn(userService, 'getUsers')
        .and.returnValue(Observable.throw({status: 400}));

      tick();
      fixture.detectChanges();
      expect(component.users).toBeUndefined();
    }));
  }

  function createAuthorizedUserTest() {
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      component.users = CONST.USERS;
    });

    it('should set some values when createAuthorizedUser() success', fakeAsync(() => {
      let authors_length = component.authorizedUsers.length;
      console.log(component.authorizedUsers);
      let users_length = component.users.length;
      let tasklistShare = component.tasklist.share;

      spyOn(tasklistService, 'createAuthorizedUser')
        .and.returnValue(Observable.of(CONST.AUTHOR_TO_CREATE));
      spyOn(console, 'log')
        .and.returnValue('Create Authen users success');
      component.createAuthorizedUser(CONST.AUTHOR_TO_CREATE.user_id);
      console.log(component.authorizedUsers);

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith('Create Authen users success');
      expect(component.authorizedUsers.length).toEqual(authors_length + 1);
      expect(component.users.length).toEqual(users_length - 1);
      expect(component.tasklist.share).toEqual(tasklistShare + 1);
    }));

    it('should NOT return console.log fail when createAuthorizedUser() error', fakeAsync(() => {
      spyOn(tasklistService, 'createAuthorizedUser')
        .and.returnValue(Observable.throw({status: 400}));
      spyOn(console, 'log')
        .and.returnValue('Create Authen users fail');
      component.createAuthorizedUser(1);

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith('Create Authen users fail');
    }));
  }

  function deleteAuthorizedUserTest() {
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      component.users = CONST.USERS;
    });

    it('should set some values when deleteAuthorizedUser() success', fakeAsync(() => {
      let authors_length = component.authorizedUsers.length;
      let users_length = component.users.length;
      let tasklistShare = component.tasklist.share;

      spyOn(tasklistService, 'deleteAuthorizedUser')
        .and.returnValue(Observable.of('run success'));
      spyOn(console, 'log')
        .and.returnValue('Create Authen users success');
      component.deleteAuthorizedUser(CONST.AUTHOR_TO_DELETE.user_id);
      console.log(component.authorizedUsers);

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith('Delete Authen users success');
      expect(component.authorizedUsers.length).toEqual(authors_length - 1);
      expect(component.users.length).toEqual(users_length + 1);
      expect(component.tasklist.share).toEqual(tasklistShare - 1);
    }));

    it('should NOT return console.log fail when deleteAuthorizedUser() error', fakeAsync(() => {
      spyOn(tasklistService, 'deleteAuthorizedUser')
        .and.returnValue(Observable.throw({status: 400}));
      spyOn(console, 'log')
        .and.returnValue('Delete Authen users fail');
      component.deleteAuthorizedUser(1);

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith('Delete Authen users fail');
    }));
  }

  function updateAuthorizedUserTest() {
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      component.users = CONST.USERS;
    });

    it('should set some values when updateAuthorizedUser() success', fakeAsync(() => {
      let authors_length = component.authorizedUsers.length;
      let users_length = component.users.length;
      let tasklistShare = component.tasklist.share;

      expect(component.authorizedUsers[0].is_write).toEqual(true);
      expect(component.authorizedUsers[1].is_write).not.toEqual(true);

      spyOn(tasklistService, 'updateAuthorizedUser')
        .and.callFake((arg1 = 1, user_id, arg2 = true) => {
        let authen_user = component.authorizedUsers.filter(h => h.user_id === user_id)[0];
        if (authen_user.is_write) {
          return Observable.of({is_write: false})
        } else {
          return Observable.of({is_write: true})
        }
      });
      spyOn(console, 'log')
        .and.returnValue('Update Authen users success');
      component.updateAuthorizedUser(4);
      component.updateAuthorizedUser(5);

      tick();
      fixture.detectChanges();
      expect(component.authorizedUsers.length).toEqual(authors_length);
      expect(component.users.length).toEqual(users_length);
      expect(component.tasklist.share).toEqual(tasklistShare);
      expect(console.log).toHaveBeenCalledWith('Update Authen users success');

      let authen_updated1 = component.authorizedUsers.filter(h => h.user_id === 4)[0];
      let authen_updated2 = component.authorizedUsers.filter(h => h.user_id === 5)[0];
      expect(authen_updated1.is_write).not.toEqual(true);
      expect(authen_updated2.is_write).toEqual(true);
    }));

    it('should NOT return console.log fail when updateAuthorizedUser() error', fakeAsync(() => {
      let user_id0 = component.authorizedUsers[0].user_id;
      spyOn(tasklistService, 'updateAuthorizedUser')
        .and.returnValue(Observable.throw({status: 400}));
      spyOn(console, 'log')
        .and.returnValue('Update Authen users fail');
      component.updateAuthorizedUser(user_id0);

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith('Update Authen users fail');
    }));
  }
});
