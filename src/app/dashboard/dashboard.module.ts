import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {DashboardComponent} from './dashboard.component';
import {TasklistComponent} from './tasklist';
import {ProfileComponent} from './profile';
import {DataFilterPipe} from './tasklist/data-silter.pipe';


import {DataTableModule} from 'angular2-datatable';

import {AuthGuard} from '../_guards/index';
import {DashboardRoutingModule} from './dashboard-routing.module';

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
    DataFilterPipe
  ],
  providers: [AuthGuard]
})
export class DashboardModule {
}
