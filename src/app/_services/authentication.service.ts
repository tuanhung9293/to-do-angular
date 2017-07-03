import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    return this.http.post('https://angular-task-list.herokuapp.com/auth/sign_in', {email: email, password: password})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        if (response && response.ok) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response));
          console.log(JSON.stringify(response));
        }
      });
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
