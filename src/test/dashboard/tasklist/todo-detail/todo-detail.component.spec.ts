import {Component, DebugElement, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {By} from '@angular/platform-browser';

import {DataTableModule} from 'angular2-datatable';

import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {TodoDetailComponent} from '../../../../app/dashboard/tasklist/todo-detail';
import * as CONST from './const-to-test-todo-detail';
import {
  TasklistService,
  AuthenticationService
} from '../../../../app/_services';

import {
  TestBed,
  fakeAsync,
  tick, ComponentFixture,
} from '@angular/core/testing';

import {ActivatedRoute, Params} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterModule} from '@angular/router';
import {Location} from '@angular/common';

describe('Testing TodoDetailComponent', () => {
  let fixture: ComponentFixture<TodoDetailComponent>;
  let component: TodoDetailComponent;
  let de: DebugElement;
  let authenticationService: AuthenticationService;
  let tasklistService: TasklistService;
  let params: Subject<Params>;

  beforeEach(() => {
    params = new Subject<Params>();
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        DataTableModule,
        RouterModule
      ],
      declarations: [
        TodoDetailComponent,
      ],
      providers: [
        TasklistService,
        AuthenticationService,
        {provide: ActivatedRoute, useValue: {params: {_value: {task_list_id: 3}}}},
        {provide: Location, useValue: {params: Observable.of({id: 'test'})}}
      ]
    });

    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    tasklistService = TestBed.get(TasklistService);
    authenticationService = TestBed.get(AuthenticationService);

    spyOn(authenticationService, 'jwt')
      .and.returnValue('run success');
  });

  it('should render TodoDetailComponent', () => {
    component.tasklistDetail = CONST.TASKLISTS[0];
    fixture.detectChanges();
    const el = de.query(By.css('h4')).nativeElement;
    expect(el.textContent).toMatch('Detail of tasklist');
  });

  it('should some Initial values is EMPTY when create TodoDetailComponent', fakeAsync(() => {
    spyOn(component, 'ngOnInit')
      .and.returnValue('run success');

    tick();
    fixture.detectChanges();
    expect(component.tasklistDetail).toBeUndefined();
    expect(component.tasklistDetailId).toBeUndefined();
    expect(component.tasklistsAuthorized).toBeUndefined();
  }));

  describe('When ngOnInit()', ngOnInitTest);
  describe('When getTasklistsAuthorized()', getTasklistsAuthorizedTest);
  describe('When getTasklistDetail()', getTasklistDetailTest);
  describe('When getTodos()', getTodosTest);
  describe('When addTodo()', addTodoTest);
  describe('When updateTodo()', updateTodoTest);
  describe('When deleteTodo()', deleteTodoTest);
  describe('When doneAllTodos()', doneAllTodosTest);
  describe('When deleteAllDones()', deleteAllDonesTest);

  function ngOnInitTest() {
    beforeEach(() => {
      spyOn(component, 'getTodos')
        .and.returnValue('run success');
    });

    it('should run ngOnInit() when create TodoDetailComponent', () => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      fixture.detectChanges();
      expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should set tasklistDetailId value when ngOnInit()', () => {
      spyOn(component, 'getTasklistsAuthorized')
        .and.returnValue('run success');
      component.ngOnInit();

      fixture.detectChanges();
      expect(component.tasklistDetailId).toEqual(3);
    });

    it('should run component.getTasklistsAuthorized() when ngOnInit()', () => {
      spyOn(component, 'getTasklistsAuthorized')
        .and.returnValue('run success');
      component.ngOnInit();

      fixture.detectChanges();
      expect(component.getTasklistsAuthorized).toHaveBeenCalled();
    });
  }

  function getTasklistsAuthorizedTest() {
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      spyOn(component, 'getTasklistDetail')
        .and.returnValue('run success');
      spyOn(component, 'getTodos')
        .and.returnValue('run success');
      component.tasklistDetailId = 3;
    });

    it('should return tasklistsAuthorized when getTasklistsAuthorized() success', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.of(CONST.TASKLISTS_AUTHORIZED));
      component.getTasklistsAuthorized();

      tick();
      fixture.detectChanges();
      expect(component.tasklistsAuthorized).toBeDefined();
    }));

    it('should run getTasklistDetail() when getTasklistsAuthorized() return EMPTY data', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.of([]));
      component.getTasklistsAuthorized();

      tick();
      fixture.detectChanges();
      expect(component.getTasklistDetail).toHaveBeenCalled();
    }));

    it('should run getTasklistDetail() when getTasklistsAuthorized() return NOT helpful data', fakeAsync(() => {
      component.tasklistDetailId = 3;
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.of(CONST.TASKLISTS_AUTHORIZED));
      component.getTasklistsAuthorized();

      tick();
      fixture.detectChanges();
      expect(component.getTasklistDetail).toHaveBeenCalled();
    }));

    it('should return tasklistDetail when getTasklistsAuthorized() return helpful data', fakeAsync(() => {
      component.tasklistDetailId = CONST.TASKLISTS_AUTHORIZED[0].id;
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.of(CONST.TASKLISTS_AUTHORIZED));
      component.getTasklistsAuthorized();

      tick();
      fixture.detectChanges();
      expect(component.tasklistDetail).toEqual(CONST.TASKLISTS_AUTHORIZED[0]);
    }));

    it('should run getTodos() when getTasklistsAuthorized() return helpful data', fakeAsync(() => {
      component.tasklistDetailId = CONST.TASKLISTS_AUTHORIZED[0].id;
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.of(CONST.TASKLISTS_AUTHORIZED));
      component.getTasklistsAuthorized();

      tick();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalled();
    }));

    it('should console.log() failed message when getTasklistsAuthorized() error', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.throw({status: 400}));
      spyOn(console, 'log')
        .and.returnValue('getTasklistsAuthorized fail');
      component.getTasklistsAuthorized();

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith('getTasklistsAuthorized fail');
    }));

    it('should NOT return tasklistsAuthorized when getTasklistsAuthorized() error', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklistsAuthorized')
        .and.returnValue(Observable.throw({status: 400}));
      component.getTasklistsAuthorized();

      tick();
      fixture.detectChanges();
      expect(component.tasklistsAuthorized).toBeUndefined();
    }));
  }

  function getTasklistDetailTest() {
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      spyOn(component, 'getTodos')
        .and.returnValue('run success');
    });

    it('should return tasklistDetail when getTasklistDetail() success', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklist')
        .and.returnValue(Observable.of(CONST.TASKLISTS[0]));
      expect(component.tasklistDetail).toBeUndefined();
      component.getTasklistDetail();

      tick();
      fixture.detectChanges();
      expect(component.tasklistDetail).toBeDefined();
      expect(component.tasklistDetail.is_write).toBeTruthy();
    }));

    it('should run getTodos when getTasklistDetail() success', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklist')
        .and.returnValue(Observable.of(CONST.TASKLISTS[0]));
      component.getTasklistDetail();

      tick();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalled();
    }));

    it('should console.log() failed message when getTasklistDetail() error', fakeAsync(() => {
      spyOn(tasklistService, 'getTasklist')
        .and.returnValue(Observable.throw({status: 400}));
      spyOn(console, 'log')
        .and.returnValue('getTasklist fail');
      component.getTasklistDetail();

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith('getTasklist fail');
    }));
  }

  function getTodosTest() {
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
    });

    it('should return todos when getTodos() success', fakeAsync(() => {
      component.tasklistDetail = CONST.TASKLISTS[0];
      spyOn(tasklistService, 'getTodos')
        .and.returnValue(Observable.of(CONST.TODOS));
      component.getTodos();

      tick();
      fixture.detectChanges();
      expect(component.todos.length).toEqual(CONST.TODOS.length);
    }));

    it('should set property count | done when getTodos() success', fakeAsync(() => {
      component.tasklistDetail = CONST.TASKLISTS[1];
      spyOn(tasklistService, 'getTodos')
        .and.returnValue(Observable.of(CONST.TODOS));
      expect(component.tasklistDetail.count).toBeNull();
      expect(component.tasklistDetail.done).toBeNull();
      component.getTodos();

      tick();
      fixture.detectChanges();
      expect(component.tasklistDetail.count).toEqual(4);
      expect(component.tasklistDetail.done).toEqual(3);
    }));

    it('should NOT return tasklistDetail when getTodos() error', fakeAsync(() => {
      spyOn(tasklistService, 'getTodos')
        .and.returnValue(Observable.throw({status: 400}));

      tick();
      fixture.detectChanges();
      expect(component.todos).toEqual([]);
    }));

    it('should console.log() failed message when getTodos() error', fakeAsync(() => {
      spyOn(tasklistService, 'getTodos')
        .and.returnValue(Observable.throw({status: 400}));
      spyOn(console, 'log')
        .and.returnValue('Get todos fail');
      component.getTodos();

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith('Get todos fail');
    }));
  }

  function addTodoTest() {
    let newTodo = 'todo named tuanhung';
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      spyOn(component, 'getTodos')
        .and.returnValue('run success');
    });

    it('should run component.getTodos() when addTodo() success', fakeAsync(() => {
      spyOn(tasklistService, 'addTodo')
        .and.returnValue(Observable.of('run success'));
      component.addTodo(newTodo);
      tick();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalledTimes(1);
    }));

    it('should log failed message when addTodo() error', fakeAsync(() => {
      spyOn(console, 'log')
        .and.returnValue(`Add todos ${newTodo} fail`);
      spyOn(tasklistService, 'addTodo')
        .and.returnValue(Observable.throw({status: 400}));
      component.addTodo(newTodo);

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith(`Add todos ${newTodo} fail`);
    }));

    it('should NOT run getTodos() when addTodo() error', fakeAsync(() => {
      spyOn(tasklistService, 'addTodo')
        .and.returnValue(Observable.throw({status: 400}));
      component.addTodo(newTodo);

      tick();
      fixture.detectChanges();
      expect(component.getTodos).not.toHaveBeenCalled();
    }));
  }

  function updateTodoTest() {
    let todo_id = 4;
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      spyOn(component, 'getTodos')
        .and.returnValue('run success');
    });

    it('should run component.getTodos() when updateTodo() success', fakeAsync(() => {
      spyOn(tasklistService, 'updateTodo')
        .and.returnValue(Observable.of('run success'));
      component.updateTodo(todo_id);
      tick();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalledTimes(1);
    }));

    it('should log failed message when updateTodo() error', fakeAsync(() => {
      spyOn(console, 'log')
        .and.returnValue(`Done todo ${todo_id} fail`);
      spyOn(tasklistService, 'updateTodo')
        .and.returnValue(Observable.throw({status: 400}));
      component.updateTodo(todo_id);

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith(`Done todo ${todo_id} fail`);
    }));

    it('should NOT run getTodos() when updateTodo() error', fakeAsync(() => {
      let newTodo = 'todo named tuanhung';
      spyOn(tasklistService, 'updateTodo')
        .and.returnValue(Observable.throw({status: 400}));
      component.updateTodo(todo_id);

      tick();
      fixture.detectChanges();
      expect(component.getTodos).not.toHaveBeenCalled();
    }));
  }

  function deleteTodoTest() {
    let todo_id = 2;
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success')
      spyOn(component, 'getTodos')
        .and.returnValue('run success');
    });

    it('should run component.getTodos() when deleteTodo() success', fakeAsync(() => {
      spyOn(tasklistService, 'deleteTodo')
        .and.returnValue(Observable.of('run success'));
      component.deleteTodo(todo_id);

      tick();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalledTimes(1);
    }));

    it('should log failed message when deleteTodo() error', fakeAsync(() => {
      spyOn(console, 'log')
        .and.returnValue(`Delete todo ${todo_id} fail`);
      spyOn(tasklistService, 'deleteTodo')
        .and.returnValue(Observable.throw({status: 400}));
      component.deleteTodo(todo_id);

      tick();
      fixture.detectChanges();
      expect(console.log).toHaveBeenCalledWith(`Delete todo ${todo_id} fail`);
    }));

    it('should NOT run component.getTodos() when deleteTodo() error', fakeAsync(() => {
      spyOn(tasklistService, 'deleteTodo')
        .and.returnValue(Observable.throw({status: 400}));
      component.deleteTodo(todo_id);

      tick();
      fixture.detectChanges();
      expect(component.getTodos).not.toHaveBeenCalled();
    }));
  }

  function doneAllTodosTest() {
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');

      spyOn(component, 'updateTodo')
        .and.returnValue('run success');
    });

    it('should run component.updateTodo() when doneAllTodos() success', () => {
      component.todos = CONST.TODOS;
      component.doneAllTodos();
      expect(component.todos.length).toEqual(7);

      fixture.detectChanges();
      expect(component.updateTodo).toHaveBeenCalledTimes(4);
    });
  }

  function deleteAllDonesTest() {
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');

      spyOn(component, 'deleteTodo')
        .and.returnValue('run success');
    });

    it('should run component.deleteTodo() when deleteAllDones() success', () => {
      component.todos = CONST.TODOS;
      component.deleteAllDones();
      expect(component.todos.length).toEqual(7);

      fixture.detectChanges();
      expect(component.deleteTodo).toHaveBeenCalledTimes(3);
    });
  }

})
;
