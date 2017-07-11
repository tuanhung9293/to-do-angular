import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {TodoSearch} from '../_models';

@Injectable()
export class SearchService {
  constructor(private http: Http) {}
  searchTodo(term: string): Observable<TodoSearch[]> {
    return this.http
      .get(`https://angular-task-list.herokuapp.com/search/${term}`, this.jwt())
      .map(response => response.json() as TodoSearch[]);
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
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
