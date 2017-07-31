import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {SearchService, AuthenticationService} from '../../../app/_services';
import {SearchComponent} from '../../../app/dashboard/search';
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

import * as CONST from './const-to-test-search'

@Component({
  template: ''
})
class TodoDetailStubComponent {
}

describe('Testing SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;
  let de: DebugElement;
  let searchService: SearchService;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        RouterModule,
        RouterTestingModule.withRoutes([
          {path: 'detail/3', component: TodoDetailStubComponent}
        ])
      ],
      declarations: [
        SearchComponent,
        TodoDetailStubComponent
      ],
      providers: [
        SearchService,
        AuthenticationService
      ]
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    searchService = TestBed.get(SearchService);
    authenticationService = TestBed.get(AuthenticationService);

    spyOn(authenticationService, 'jwt')
      .and.returnValue('run success');
  });

  it('should render SearchComponent', () => {
    const el = de.query(By.css('label')).nativeElement;
    expect(el.textContent).toMatch('Search todo:');
  });

  describe('When SearchComponent run ngOnInit()', () => {
    it('should "todos" to be Undefined when begin SearchComponent', () => {
      spyOn(component, 'ngOnInit')
        .and.returnValue('run success');
      fixture.detectChanges();
      expect(component.todos).toBeUndefined();
    });

    it('should "todos" to be Defined when ngOnInit()', () => {
      fixture.detectChanges();
      expect(component.todos).toBeDefined();
    });
  });

  describe('When gotoDetail()', () => {
    it('should navigate to detail url when gotoDetail() success', fakeAsync(inject([Router], (router) => {
      let tasklist_search = CONST.TODOSEARCH[0];
      spyOn(router, 'navigate');
      component.gotoDetail(tasklist_search);

      tick();
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith(['/detail', tasklist_search.task_list_id]);
    })));
  });
});


