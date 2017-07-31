import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import * as PRODUCT from '../../app/_constants/product-env';

@Injectable()
export class AuthenticationMockService {

  constructor(private http1: Http) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http1.post(`${PRODUCT.serverURL}/${PRODUCT.userSignInPATH}/`, {email: email, password: password})
      .map((response: Response) => {
        this.extractData(response);
        if (response && response.ok) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          console.log(JSON.stringify(response));
          return response.json() as any;
        }
      })
      .catch(this.handleError);
  }

  jwt() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Uid', 'tuanhung@gmail.com');
    headers.append('Client', 'jsjdfdfdf92394934');
    headers.append('Access-Token', 'sfjdjfjdfjdsf934943432');
    return new RequestOptions({headers: headers});
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
