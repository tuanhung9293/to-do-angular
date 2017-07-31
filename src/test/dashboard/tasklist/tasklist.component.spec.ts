import {Component, DebugElement, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Router, RouterModule} from '@angular/router';
import {By} from '@angular/platform-browser';

import {RouterTestingModule} from '@angular/router/testing';
import {DataTableModule} from 'angular2-datatable';

import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

import {TasklistFilterPipe} from '../../../app/dashboard/tasklist/tasklist-filter.pipe';

import {TasklistComponent} from '../../../app/dashboard/tasklist';
import {Authen, Tasklist} from '../../../app/_models';
import * as CONST from './const-to-test';
import {
  UserService,
  TasklistService,
  AuthenticationService
} from '../../../app/_services';

import {
  TestBed,
  fakeAsync,
  tick, ComponentFixture,
} from '@angular/core/testing';

@Component({
  selector: 'app-search',
  template: ''
})
class SearchStubComponent {
}

@Component({
  selector: 'app-authen',
  template: ''
})
class AuthenStubComponent {
  @Input() authorizedUsers: Authen[];
  @Input() tasklist: Tasklist;
}

@Component({
  selector: 'app-todos',
  template: ''
})
class TodosStubComponent {
  @Input() tasklist: Tasklist;
}

describe('Testing TasklistComponent', () => {
  let fixture: ComponentFixture<TasklistComponent>;
  let component: TasklistComponent;
  let de: DebugElement;
  let userService: UserService;
  let authenticationService: AuthenticationService;
  let tasklistService: TasklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        DataTableModule
      ],
      declarations: [
        TasklistComponent,
        TasklistFilterPipe,
        SearchStubComponent,
        AuthenStubComponent,
        TodosStubComponent
      ],
      providers: [
        UserService,
        TasklistService,
        AuthenticationService
      ]
    });

    fixture = TestBed.createComponent(TasklistComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    userService = TestBed.get(UserService);
    tasklistService = TestBed.get(TasklistService);
    authenticationService = TestBed.get(AuthenticationService);
    spyOn(authenticationService, 'jwt')
      .and.returnValue('run success');
  });

  it('should render TasklistComponent', fakeAsync(() => {
    const el = de.query(By.css('label')).nativeElement;
    expect(el.textContent).toMatch('Tasklist name:');
  }));

  describe('When ngOnInit()', ngOnInitTest);
  describe('When getUsers()', getUsersTest);
  describe('When getTasklists()', getTasklistsTest);
  describe('When getTasklistsAuthorized()', getTasklistsAuthorizedTest);
  describe('When getAuthorizedUsers()', getAuthorizedUsersTest);
  describe('When getTasklist()', getTasklistTest);
  describe('When createTasklist()', createTasklistTest);
  describe('When updateTasklist()', updateTasklistTest);
  describe('When deleteTasklist()', deleteTasklistTest);

  function ngOnInitTest() {
    beforeEach(() => {
      spyOn(component, 'getUsers')
        .and.returnValue('run success');
      spyOn(component, 'getTasklists')
        .and.returnValue('run success');
    });

    it('should run ngOnInit() when create TasklistComponent', () => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      fixture.detectChanges();
      expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should run getUsers() and getTasklists() when ngOnInit()', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.getUsers).toHaveBeenCalled();
      expect(component.getTasklists).toHaveBeenCalled();
    });
  }

  function getUsersTest() {
    beforeEach(() => {
      spyOn(component, 'getTasklists')
        .and.returnValue('run success');
    });

    it('should getUsers() when create TasklistComponent', fakeAsync(() => {
      spyOn(component, 'getUsers')
        .and.returnValue(Observable.of('success'));

      tick();
      fixture.detectChanges();
      expect(component.getUsers).toHaveBeenCalled();
    }));

    it('should return users when getUsers() success', fakeAsync(() => {
      spyOn(userService, 'getUsers')
        .and.returnValue(Observable.of(CONST.USERS));

      tick();
      fixture.detectChanges();
      expect(component.users.length).toEqual(CONST.USERS.length);
    }));

    it('should NOT return users when getUsers() error', fakeAsync(() => {
      spyOn(userService, 'getUsers')
        .and.returnValue(Observable.throw({status: 400}));

      tick();
      fixture.detectChanges();
      expect(component.users).toBeUndefined();
    }));
  }

  function getTasklistsTest() {
    beforeEach(() => {
      spyOn(component, 'getUsers')
        .and.returnValue('run success');

      spyOn(component, 'getAuthorizedUsers')
        .and.returnValue('run success');

      spyOn(component, 'getTasklistsAuthorized')
        .and.returnValue('run success');

      spyOn(userService, 'getCurrentUser')
        .and.returnValue('success');
    });

    it('should getTasklists() when create TasklistComponent', fakeAsync(() => {
      spyOn(component, 'getTasklists')
        .and.returnValue('success');

      tick();
      fixture.detectChanges();
      expect(component.getTasklists).toHaveBeenCalled();
    }));

    it('should return tasklists when getTasklists() success', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklists')
        .and.returnValue(Observable.of(CONST.TASKLISTS));

      tick();
      fixture.detectChanges();
      expect(component.data.length).toEqual(CONST.TASKLISTS.length);
    }));

    it('should set property owner | is_write | user  when getTasklists() success', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklists')
        .and.returnValue(Observable.of(CONST.TASKLISTS));

      tick();
      fixture.detectChanges();
      expect(component.data[2].owner).toEqual(true);
      expect(component.data[3].is_write).toEqual(true);
      expect(component.data[4].user).toEqual('success');
    }));

    it('should call some functions  when getTasklists() success', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklists')
        .and.returnValue(Observable.of(CONST.TASKLISTS));

      tick();
      fixture.detectChanges();
      expect(userService.getCurrentUser).toHaveBeenCalledTimes(CONST.TASKLISTS.length);
      expect(component.getAuthorizedUsers).toHaveBeenCalledTimes(CONST.TASKLISTS.length);
      expect(component.getTasklistsAuthorized).toHaveBeenCalled();
    }));

    it('should NOT return tasklists when getTasklists() error', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklists')
        .and.returnValue(Observable.throw({status: 400}));

      tick();
      fixture.detectChanges();
      expect(component.data).toBeUndefined();
    }));
  }

  function getTasklistsAuthorizedTest() {
    beforeEach(() => {
      spyOn(component, 'getUsers')
        .and.returnValue('run success');

      spyOn(component, 'getTasklists')
        .and.returnValue('run success');
    });

    it('should add more tasklist when getTasklistsAuthorized() success', fakeAsync(() => {
      component.users = CONST.USERS;
      component.data = CONST.TASKLISTS;
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.of(CONST.TASKLISTS_SHARED));
      component.getTasklistsAuthorized();

      tick();
      fixture.detectChanges();
      expect(component.data.length).toEqual(CONST.TASKLISTS.length + CONST.TASKLISTS_SHARED.length);
    }));

    it('should tasklist_shared have "user" property when getTasklistsAuthorized() success', fakeAsync(() => {
      component.users = CONST.USERS;
      component.data = [];
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.of(CONST.TASKLISTS_SHARED));
      component.getTasklistsAuthorized();

      tick();
      fixture.detectChanges();
      expect(component.data[0].user.length).toBeGreaterThan(1);
      expect(component.data[1].user.length).toBeGreaterThan(1);
      expect(component.data[CONST.TASKLISTS_SHARED.length - 1].user.length).toBeGreaterThan(1);
    }));

    it('should NOT return tasklists when getTasklistsAuthorized() error', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.throw({status: 400}));

      component.getTasklistsAuthorized();
      tick();
      fixture.detectChanges();
      expect(component.data).toBeUndefined();
    }));
  }

  function getAuthorizedUsersTest() {
    beforeEach(() => {
      spyOn(component, 'getUsers')
        .and.returnValue('run success');

      spyOn(component, 'getTasklists')
        .and.returnValue('run success');
    });

    it('should define "share" and "authorizedUsers" property of tasklist when getAuthorizedUsers() success', fakeAsync(() => {
      let data_id = 2;
      component.data = CONST.TASKLISTS;
      spyOn(tasklistService, 'getAuthorizedUsers')
        .and.returnValue(Observable.of(CONST.AUTHORS));
      expect(component.data[data_id].share).toBeNull();
      expect(component.data[data_id].authorizedUsers).toBeNull();

      component.getAuthorizedUsers(2, data_id);

      tick();
      fixture.detectChanges();
      expect(component.data[data_id].share).toEqual(CONST.AUTHORS.length);
      expect(component.data[data_id].authorizedUsers.length).toEqual(CONST.AUTHORS.length);
      CONST.TASKLISTS[data_id].share = null;
      CONST.TASKLISTS[data_id].authorizedUsers = null;
    }));

    it('should NOT return authors when getAuthorizedUsers() error', fakeAsync(() => {
      let data_id = 3;
      component.data = CONST.TASKLISTS;
      spyOn(tasklistService, 'getAuthorizedUsers')
        .and.returnValue(Observable.throw({status: 400}));
      console.log(CONST.TASKLISTS[2].share);
      component.getAuthorizedUsers(2, data_id);
      tick();
      fixture.detectChanges();
      expect(component.data[data_id].authorizedUsers).toBeNull();
    }));
  }

  function getTasklistTest() {
    beforeEach(() => {
      spyOn(component, 'getUsers')
        .and.returnValue('run success');

      spyOn(component, 'getTasklists')
        .and.returnValue('run success');
    });

    it('should return true tasklistName when getTasklist() success', fakeAsync(() => {
      component.data = CONST.TASKLISTS;
      let tasklist_id = CONST.TASKLISTS[0].id;
      component.data[0].name = 'ttttt';
      spyOn(tasklistService, 'getTasklist')
        .and.returnValue(Observable.of(CONST.TASKLISTS[0]));
      component.getTasklist(tasklist_id);

      tick();
      fixture.detectChanges();
      expect(component.data[0].name).toEqual(CONST.TASKLISTS[0].name);
    }));

    it('should NOT return true tasklistName when getTasklist() error', fakeAsync(() => {
      component.data = CONST.TASKLISTS;
      let tasklist_id = CONST.TASKLISTS[0].id;
      component.data[0].name = 'ttvv';
      spyOn(tasklistService, 'getTasklist')
        .and.returnValue(Observable.throw({status: 400}));
      component.getTasklist(tasklist_id);

      tick();
      fixture.detectChanges();
      expect(component.data[0].name).toEqual('ttvv');
    }));
  }

  function createTasklistTest() {
    let currentUser = 'levante';
    beforeEach(() => {
      spyOn(component, 'getUsers')
        .and.returnValue('run success');

      spyOn(component, 'getTasklists')
        .and.returnValue('run success');

      spyOn(userService, 'getCurrentUser')
        .and.returnValue(currentUser);
    });

    it('should add 1 tasklist when createTasklist() success', fakeAsync(() => {
      let tasklist_name = 'sssddd';
      component.data = CONST.TASKLISTS;
      let length1 = component.data.length;
      spyOn(tasklistService, 'createTasklist')
        .and.returnValue(Observable.of(CONST.TASKLISTS[0]));
      component.createTasklist(tasklist_name);

      tick();
      fixture.detectChanges();
      let length2 = component.data.length;
      expect(component.data.length).toEqual(length1 + 1);
      expect(component.data[length2 - 1].is_write).toEqual(true);
      expect(component.data[length2 - 1].share).toEqual(0);
      expect(component.data[length2 - 1].owner).toEqual(true);
      expect(component.data[length2 - 1].user).toEqual(currentUser);
      expect(component.data[length2 - 1].authorizedUsers).toEqual([]);

    }));

    it('should NOT add 1 tasklist when createTasklist() error', fakeAsync(() => {
      let tasklist_name = 'sssddd';
      component.data = CONST.TASKLISTS;
      spyOn(tasklistService, 'createTasklist')
        .and.returnValue(Observable.throw({status: 400}));
      component.createTasklist(tasklist_name);

      tick();
      fixture.detectChanges();
      expect(component.data.length).toEqual(CONST.TASKLISTS.length);
    }));
  }

  function updateTasklistTest() {
    beforeEach(() => {
      spyOn(component, 'getUsers')
        .and.returnValue('run success');

      spyOn(component, 'getTasklists')
        .and.returnValue('run success');

      spyOn(component, 'getTasklist')
        .and.returnValue('run success');
    });

    it('should NOT run getTasklist() when updateTasklist() success', fakeAsync(() => {
      spyOn(tasklistService, 'updateTasklist')
        .and.returnValue(Observable.of('run success'));
      component.updateTasklist(3, 'sfdf');

      tick();
      fixture.detectChanges();
      expect(component.getTasklist).not.toHaveBeenCalled();
    }));

    it('should NOT add 1 tasklist when updateTasklist() error', fakeAsync(() => {
      spyOn(tasklistService, 'updateTasklist')
        .and.returnValue(Observable.throw({status: 400}));
      component.updateTasklist(2, 'wwss');

      tick();
      fixture.detectChanges();
      expect(component.getTasklist).toHaveBeenCalled();
    }));
  }

  function deleteTasklistTest() {
    beforeEach(() => {
      spyOn(component, 'getUsers')
        .and.returnValue('run success');

      spyOn(component, 'getTasklists')
        .and.returnValue('run success');
    });

    it('should remove 1 tasklist when deleteTasklist() success', fakeAsync(() => {
      component.data = CONST.TASKLISTS;
      let tasklist_id = CONST.TASKLISTS[1].id;

      let length1 = component.data.length;

      spyOn(tasklistService, 'deleteTasklist')
        .and.returnValue(Observable.of('run success'));
      component.deleteTasklist(tasklist_id);

      tick();
      fixture.detectChanges();
      let length2 = component.data.length;
      expect(length2).toEqual(length1 - 1);
    }));

    it('should NOT add 1 tasklist when deleteTasklist() error', fakeAsync(() => {
      component.data = CONST.TASKLISTS;
      let tasklist_id = CONST.TASKLISTS[1].id;

      let length1 = component.data.length;

      spyOn(tasklistService, 'deleteTasklist')
        .and.returnValue(Observable.throw({status: 400}));
      component.deleteTasklist(tasklist_id);

      tick();
      fixture.detectChanges();
      let length2 = component.data.length;
      expect(length2).toEqual(length1);
    }));
  }
});
