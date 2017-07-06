import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {routing} from './app.routing';

import {AuthGuard} from './_guards/index';
import {AlertService, UserService, AuthenticationService} from './_services';

import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
import {AppComponent} from './app.component';
import {TasklistService} from './_services';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AlertService,
    UserService,
    TasklistService,
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
