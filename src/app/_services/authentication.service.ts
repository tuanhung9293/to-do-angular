import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  url: string = 'https://angular-task-list.herokuapp.com/';

  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    return this.http.post(`${this.url}auth/sign_in`, {email: email, password: password})
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

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
