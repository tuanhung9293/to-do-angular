import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app.routing';

import {AuthGuard} from './_guards/index';
import {AlertService, UserService, AuthenticationService} from './_services';

import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
import {AppComponent} from './app.component';
import {AlertComponent} from './alert';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AlertService,
    UserService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
