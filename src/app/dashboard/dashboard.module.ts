import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {DashboardComponent} from './dashboard.component';
import {TasklistComponent} from './tasklist';
import {ProfileComponent} from './profile';
import {SearchComponent} from './search';

import {TasklistFilterPipe} from './tasklist/tasklist-filter.pipe';
import {TodosComponent} from './tasklist/todo';
import {AuthenComponent} from './tasklist/authentication';
import {TodoDetailComponent} from './tasklist/todo-detail';

import {DataTableModule} from 'angular2-datatable';
import { Ng2OrderModule } from 'ng2-order-pipe';

import {AuthGuard} from '../_guards/index';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TasklistService, UserService, SearchService} from '../_services';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DataTableModule,
    Ng2OrderModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    DashboardComponent,
    TasklistComponent,
    ProfileComponent,
    TasklistFilterPipe,
    TodosComponent,
    AuthenComponent,
    SearchComponent,
    TodoDetailComponent
  ],
  providers: [
    AuthGuard,
    TasklistService,
    UserService,
    SearchService
  ]
})
export class DashboardModule {
}
