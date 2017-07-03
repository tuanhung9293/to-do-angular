import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../_models';
import {toPromise} from 'rxjs/operator/toPromise';

@Injectable()
export class UserService {
  constructor(private http: Http) {
  }

  getAll() {
    this.http.post('https://angular-task-list.herokuapp.com/task_lists', this.jwt())
      .map((response: Response) => console.log(response));
  }

  getById(id: number) {
    return this.http.get('https://angular-task-list.herokuapp.com/' + id, this.jwt()).map((response: Response) => response.json());
  }

  // create(user: User) {
  //   return this.http.post('https://angular-task-list.herokuapp.com/auth', user, this.jwt()).map((response: Response) => response.json());
  // }

  create(user: User): Promise<User> {
    return this.http.post('https://angular-task-list.herokuapp.com/auth', user)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  update(user: User) {
    return this.http.put('https://angular-task-list.herokuapp.com/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('https://angular-task-list.herokuapp.com/' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  createTasklist(tasklist: string) {
    const tsk = {name: tasklist};
    return this.http.post('https://angular-task-list.herokuapp.com/task_lists', tsk, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      headers.append('Content-Type', 'application/json');
      headers.append('Uid', currentUser.headers['Content-Type']);
      headers.append('Client', currentUser.headers['Client']);
      headers.append('Access-Token', currentUser.headers['Access-Token']);
      return new RequestOptions({headers: headers});
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // private jwt() {
  //   let headers = new Headers();
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Uid', currentUser.headers['Content-Type']);
  //   headers.append('Client', currentUser.headers['Client']);
  //   headers.append('Access-Token', currentUser.headers['Access-Token']);
  //   return {header: headers};
  // }
}
