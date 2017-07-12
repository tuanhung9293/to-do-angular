import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../_models';
import {PasswordChange} from '../_models';

import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserService {
  constructor(private http: Http,
              private authenticationService: AuthenticationService) {}

  createUser(user: User): Promise<User> {
    return this.http.post(`${this.authenticationService.url}auth`, user)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.authenticationService.handleError);
  }

  changePassword(changepassword: PasswordChange): Promise<PasswordChange> {
    return this.http.put(`${this.authenticationService.url}auth/password`, changepassword, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as PasswordChange)
      .catch(this.authenticationService.handleError);
  }

  getUsers(): Promise<any> {
    return this.http.get(`${this.authenticationService.url}users`, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.authenticationService.handleError);
  }

  getCurrentUser() {
    return this.currentUser();
  }

  private currentUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.headers['Uid'];
  }
}
