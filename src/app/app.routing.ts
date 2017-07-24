import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';

import {AuthGuard} from './_guards/index';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '**', redirectTo: ''}
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

