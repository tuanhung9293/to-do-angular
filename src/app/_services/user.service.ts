import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {User} from '../_models/index';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  getAll() {
    return this.http.get('https://angular-task-list.herokuapp.com/', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('https://angular-task-list.herokuapp.com/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post('https://angular-task-list.herokuapp.com/auth', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put('https://angular-task-list.herokuapp.com/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('https://angular-task-list.herokuapp.com/' + id, this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }
}
