import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../_models';
import {ChangePassword} from '../_models';
import {toPromise} from 'rxjs/operator/toPromise';
import {Tasklist} from '../_models/tasklist';

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

  getTasklists(): Promise<any> {
    return this.http.get('https://angular-task-list.herokuapp.com/task_lists', this.jwt())
      .toPromise()
      .then(response => response.json() as Tasklist)
      .catch(this.handleError);
  }

  addTasklist(tasklistName: string): Promise<any> {
    return this.http.post('https://angular-task-list.herokuapp.com/task_lists', {name: tasklistName}, this.jwt())
      .toPromise()
      .then(response => {
        console.log('create tasklist success in service')
      })
      .catch(this.handleError);
  }

  deleteTasklist(id: number): Promise<any> {
    return this.http.delete(`https://angular-task-list.herokuapp.com/task_lists/${id}/`, this.jwt())
      .toPromise()
      .then(response => {
        console.log(`delete tasklist ${id} success in service`)
      })
      .catch(this.handleError);
  }

  getTodos(id: number): Promise<any> {
    return this.http.get(`https://angular-task-list.herokuapp.com/task_lists/${id}/todos/`, this.jwt())
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }


  getAll() {
    this.http.post('https://angular-task-list.herokuapp.com/task_lists', this.jwt())
      .map((response: Response) => console.log(response));
  }

  getById(id: number) {
    return this.http.get('https://angular-task-list.herokuapp.com/' + id, this.jwt()).map((response: Response) => response.json());
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
