import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Tasklist} from '../_models';
import {Todo} from '../_models';
import {Authen} from '../_models';

import {AuthenticationService} from './authentication.service';
import * as PRODUCT from '../_constants/product-env';

@Injectable()
export class TasklistService {
  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  getTasklists(): Promise<any> {
    return this.http.get(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}`, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as Tasklist[])
      .catch(this.authenticationService.handleError);
  }

  getTasklist(tasklist_id: number): Promise<any> {
    return this.http.get(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}/`, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as Tasklist)
      .catch(this.authenticationService.handleError);
  }

  getTasklistsAuthorized(): Promise<any> {
    return this.http.get(`${PRODUCT.serverURL}/${PRODUCT.tasklistsAuthorizedPATH}/`, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as Tasklist)
      .catch(this.authenticationService.handleError);
  }

  getAuthorizedUsers(tasklist_id: number): Promise<any> {
    return this.http.get(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}/${PRODUCT.sharePATH}/`, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as Authen[])
      .catch(this.authenticationService.handleError);
  }

  createAuthorizedUser(tasklist_id: number, user_id: number): Promise<any> {
    return this.http.post(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}/${PRODUCT.sharePATH}/`, {user_id: user_id}, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as Authen[])
      .catch(this.authenticationService.handleError);
  }

  updateAuthorizedUser(tasklist_id: number, user_id: number, is_write: boolean): Promise<any> {
    return this.http.put(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}/${PRODUCT.sharePATH}/`, {
      user_id: user_id,
      is_write: is_write
    }, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as Authen[])
      .catch(this.authenticationService.handleError);
  }

  deleteAuthorizedUser(tasklist_id: number, user_id: number): Promise<any> {
    return this.http
      .delete(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}/${PRODUCT.sharePATH}/`, new RequestOptions({
        body: {user_id: user_id},
        headers: this.authenticationService.jwt().headers
      }))
      .toPromise()
      .then(response => response.json() as Authen[])
      .catch(this.authenticationService.handleError);
  }

  createTasklist(tasklistName: string): Promise<any> {
    return this.http.post(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}`, {name: tasklistName}, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as Tasklist[])
      .catch(this.authenticationService.handleError);
  }

  deleteTasklist(id: number): Promise<any> {
    return this.http.delete(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${id}/`, this.authenticationService.jwt())
      .toPromise()
      .then(response => {
        console.log(`delete tasklist ${id} success in service`)
      })
      .catch(this.authenticationService.handleError);
  }

  updateTasklist(tasklist_id: number, tasklist_name: string): Promise<any> {
    return this.http.put(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}`, {name: tasklist_name}, this.authenticationService.jwt())
      .toPromise()
      .then((response) => response.json() as Tasklist)
      .catch(this.authenticationService.handleError);
  }

  getTodos(tasklist_id: number): Promise<any> {
    return this.http.get(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}/${PRODUCT.todosPATH}/`, this.authenticationService.jwt())
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this.authenticationService.handleError);
  }

  addTodo(tasklist_id: number, name: string): Promise<any> {
    return this.http.post(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}/${PRODUCT.todosPATH}/`, {name: name}, this.authenticationService.jwt()
    )
      .toPromise()
      .catch(this.authenticationService.handleError);
  }

  updateTodo(tasklist_id: number, todo_id: number): Promise<any> {
    return this.http.put(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}/${PRODUCT.todosPATH}/${todo_id}`, {done: true}, this.authenticationService.jwt())
      .toPromise()
      .catch(this.authenticationService.handleError);
  }

  deleteTodo(tasklist_id: number, todo_id: number): Promise<any> {
    return this.http.delete(`${PRODUCT.serverURL}/${PRODUCT.tasklistsPATH}/${tasklist_id}/${PRODUCT.todosPATH}/${todo_id}`, this.authenticationService.jwt())
      .toPromise()
      .catch(this.authenticationService.handleError);
  }
}
