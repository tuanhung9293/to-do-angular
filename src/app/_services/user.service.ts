import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

import {User} from '../_models';
import {PasswordChange} from '../_models';

import {AuthenticationService} from './authentication.service';
import * as PRODUCT from '../_constants/product-env';

@Injectable()
export class UserService {
  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  createUser(user: User): Observable<User> {
    return this.http.post(`${PRODUCT.serverURL}/${PRODUCT.userCreatePATH}/`, user)
      .map(response => {
        this.authenticationService.extractData(response);
        return response.json() as User
      })
      .catch(this.authenticationService.handleError);
  }

  changePassword(changepassword: PasswordChange): Observable<PasswordChange> {
    return this.http.put(`${PRODUCT.serverURL}/${PRODUCT.userPasswordPATH}/`, changepassword, this.authenticationService.jwt())
      .map(response => {
        this.authenticationService.extractData(response);
        return response.json() as PasswordChange;
      })
      .catch(this.authenticationService.handleError);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${PRODUCT.serverURL}/${PRODUCT.getUsersPATH}/`, this.authenticationService.jwt())
      .map(response => {
        this.authenticationService.extractData(response);
        return response.json() as User[];
      })
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
