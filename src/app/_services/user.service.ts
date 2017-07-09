import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../_models';
import {ChangePassword} from '../_models';
import {toPromise} from 'rxjs/operator/toPromise';
import {Tasklist} from '../_models/tasklist';
import {current} from "codelyzer/util/syntaxKind";

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  create(user: User): Promise<User> {
    return this.http.post('https://angular-task-list.herokuapp.com/auth', user)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  changePassword(changepassword: ChangePassword): Promise<ChangePassword> {
    return this.http.put('https://angular-task-list.herokuapp.com/auth/password', changepassword, this.jwt())
      .toPromise()
      .then(response => response.json() as ChangePassword)
      .catch(this.handleError);
  }

  getUsers(): Promise<any> {
    return this.http.get('https://angular-task-list.herokuapp.com/users', this.jwt())
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getCurrentUser() {
    return this.current_user();
  }

  private current_user() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.headers['Uid'];
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Uid', currentUser.headers['Uid']);
      headers.append('Client', currentUser.headers['Client']);
      headers.append('Access-Token', currentUser.headers['Access-Token']);
      return new RequestOptions({headers: headers});
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
