import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {DashboardComponent} from './dashboard.component';
import {TasklistComponent} from './tasklist';
import {ProfileComponent} from './profile';
import {DataFilterPipe} from './tasklist/data-silter.pipe';
import {TodosComponent} from './tasklist/todo';
import {AuthenComponent} from './tasklist/authentication';

import {DataTableModule} from 'angular2-datatable';

import {AuthGuard} from '../_guards/index';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TasklistService} from '../_services';
import {UserService} from '../_services';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataTableModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    DashboardComponent,
    TasklistComponent,
    ProfileComponent,
    DataFilterPipe,
    TodosComponent,
    AuthenComponent
  ],
  providers: [
    AuthGuard,
    TasklistService,
    UserService
  ]
})
export class DashboardModule {
}
