import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {toPromise} from 'rxjs/operator/toPromise';
import {Tasklist} from '../_models';
import {Todo} from '../_models';

@Injectable()
export class TasklistService {
  constructor(private http: Http) {
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

  updateTasklist(tasklist_id: number, tasklist_name: string): Promise<any> {
    return this.http.put(`https://angular-task-list.herokuapp.com/task_lists/${tasklist_id}`, {name: tasklist_name}, this.jwt())
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  getTodos(tasklist_id: number): Promise<any> {
    return this.http.get(`https://angular-task-list.herokuapp.com/task_lists/${tasklist_id}/todos/`, this.jwt())
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this.handleError);
  }

  addTodo(tasklist_id: number, name: string): Promise<any> {
    return this.http.post(`https://angular-task-list.herokuapp.com/task_lists/${tasklist_id}/todos/`, {name: name}, this.jwt()
    )
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  updateTodo(tasklist_id: number, todo_id: number): Promise<any> {
    return this.http.put(`https://angular-task-list.herokuapp.com/task_lists/${tasklist_id}/todos/${todo_id}`, {done: true}, this.jwt())
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  deleteTodo(tasklist_id: number, todo_id: number): Promise<any> {
    return this.http.delete(`https://angular-task-list.herokuapp.com/task_lists/${tasklist_id}/todos/${todo_id}`, this.jwt())
      .toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
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
