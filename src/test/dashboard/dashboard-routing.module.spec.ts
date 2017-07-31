import {Component} from '@angular/core';
import {Routes} from '@angular/router';

import {Location} from '@angular/common';
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

import {DashboardRoutingModule} from '../../app/dashboard/dashboard-routing.module';

import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

@Component({
  template: `dashboard`
})
export class DashboardStubComponent {
}

@Component({
  template: `profile`
})
export class ProfileStubComponent {
}

@Component({
  template: `tasklist`
})
export class TasklistStubComponent {
}

@Component({
  template: `todo-detail`
})
export class TodoDetailStubComponent {
}

describe('Router: App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        RouterModule,
        RouterTestingModule.withRoutes([
          {path: '', component: TasklistStubComponent},
          {path: 'profile', component: ProfileStubComponent}
        ]),
        DashboardRoutingModule
      ],
      declarations: [
        DashboardStubComponent,
        ProfileStubComponent,
        TasklistStubComponent,
        TodoDetailStubComponent
      ],
    });
  });
});
