import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {TasklistComponent} from './tasklist';
import {ProfileComponent} from './profile';

import { AuthGuard } from '../_guards/index';

import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    TasklistComponent,
    ProfileComponent
  ],
  providers: [AuthGuard]
})
export class DashboardModule {
}
