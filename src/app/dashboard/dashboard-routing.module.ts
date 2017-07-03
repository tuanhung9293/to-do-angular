import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {TasklistComponent} from './tasklist';
import {ProfileComponent} from './profile';

import {AuthGuard} from '../_guards';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: TasklistComponent},
      {path: 'profile', component: ProfileComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class DashboardRoutingModule {
}
