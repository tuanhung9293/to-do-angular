import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';

import { AuthGuard } from './_guards/index';
import { AlertService, UserService, AuthenticationService } from './_services/index';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DashboardComponent } from './dashboard/index';
import { AppComponent, } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
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
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
