import {Component, DebugElement, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {By} from '@angular/platform-browser';

import {DataTableModule} from 'angular2-datatable';

import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

import {TodosComponent} from '../../../../app/dashboard/tasklist/todo';
import * as CONST from './const-to-test-todo';
import {
  TasklistService,
  AuthenticationService
} from '../../../../app/_services';

import {
  TestBed,
  fakeAsync,
  tick, ComponentFixture,
} from '@angular/core/testing';

describe('Testing TodoComponent', () => {
  let fixture: ComponentFixture<TodosComponent>;
  let component: TodosComponent;
  let de: DebugElement;
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
        TodosComponent,
      ],
      providers: [
        TasklistService,
        AuthenticationService
      ]
    });

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    tasklistService = TestBed.get(TasklistService);
    authenticationService = TestBed.get(AuthenticationService);
    spyOn(authenticationService, 'jwt')
      .and.returnValue('run success');
    component.tasklist = CONST.TASKLISTS[0];
  });

  it('should render TodoComponent', () => {
    const el = de.query(By.css('h4')).nativeElement;
    expect(el.textContent).toMatch('Detail of tasklist');
  });

  describe('When ngOnInit()', ngOnInitTest);
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

    it('should run ngOnInit() when create TodosComponent', () => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      fixture.detectChanges();
      expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should run getTodos() when ngOnInit()', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalled();
    });
  }

  function getTodosTest() {
    it('should getTodos() when create TodoComponent', fakeAsync(() => {
      spyOn(component, 'getTodos')
        .and.returnValue('success');

      tick();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalled();
    }));

    it('should return todos when getTodos() success', fakeAsync(() => {
      spyOn(tasklistService, 'getTodos')
        .and.returnValue(Observable.of(CONST.TODOS));

      tick();
      fixture.detectChanges();
      expect(component.todos.length).toEqual(CONST.TODOS.length);
    }));

    it('should set property count | done when getTodos() success', fakeAsync(() => {
      spyOn(tasklistService, 'getTodos')
        .and.returnValue(Observable.of(CONST.TODOS));

      tick();
      fixture.detectChanges();
      expect(component.todos.length).toEqual(CONST.TODOS.length);
      expect(component.tasklist.count).toEqual(4);
      expect(component.tasklist.done).toEqual(3);
    }));

    it('should NOT return tasklists when getTodos() error', fakeAsync(() => {
      spyOn(tasklistService, 'getTodos')
        .and.returnValue(Observable.throw({status: 400}));

      tick();
      fixture.detectChanges();
      expect(component.todos).toEqual([]);
    }));
  }

  function addTodoTest() {
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');

      spyOn(component, 'getTodos')
        .and.returnValue('run success');
    });

    it('should run component.getTodos() when addTodo() success', fakeAsync(() => {
      spyOn(tasklistService, 'addTodo')
        .and.returnValue(Observable.of('ru success'));
      component.addTodo('todo name');
      tick();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalledTimes(1);
    }));

    it('should NOT run component.getTodos() when addTodo() error', fakeAsync(() => {
      spyOn(tasklistService, 'addTodo')
        .and.returnValue(Observable.throw({status: 400}));
      component.addTodo('todo call');
      tick();
      fixture.detectChanges();
      expect(component.getTodos).not.toHaveBeenCalled();
    }));
  }

  function updateTodoTest() {
    let todo_id = 2;
    beforeEach(() => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');

      spyOn(component, 'getTodos')
        .and.returnValue('run success');
    });

    it('should run component.getTodos() when updateTodo() success', fakeAsync(() => {
      spyOn(tasklistService, 'updateTodo')
        .and.returnValue(Observable.of('ru success'));
      component.updateTodo(todo_id);

      tick();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalledTimes(1);
    }));

    it('should NOT run component.getTodos() when updateTodo() error', fakeAsync(() => {
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
        .and.returnValue('run success');

      spyOn(component, 'getTodos')
        .and.returnValue('run success');
    });

    it('should run component.getTodos() when deleteTodo() success', fakeAsync(() => {
      spyOn(tasklistService, 'deleteTodo')
        .and.returnValue(Observable.of('ru success'));
      component.deleteTodo(todo_id);

      tick();
      fixture.detectChanges();
      expect(component.getTodos).toHaveBeenCalledTimes(1);
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

});
