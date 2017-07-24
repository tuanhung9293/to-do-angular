import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
// import {Observable} from 'rxjs/Observable';

import * as PRODUCT from '../_constants/product-env';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    return this.http.post(`${PRODUCT.serverURL}/${PRODUCT.userSignInPATH}/`, {email: email, password: password})
      .map((response: Response) => {
        if (response && response.ok) {
          localStorage.setItem('currentUser', JSON.stringify(response));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  jwt() {
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

  extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
