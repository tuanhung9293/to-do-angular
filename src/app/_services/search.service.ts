import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {TodoSearch} from '../_models';
import {AuthenticationService} from './authentication.service';
import * as PRODUCT from '../_constants/product-env';

@Injectable()
export class SearchService {
  constructor(private http: Http,
              private authenticationService: AuthenticationService) {
  }

  searchTodo(term: string): Observable<TodoSearch[]> {
    return this.http
      .get(`${PRODUCT.serverURL}/${PRODUCT.searchTodoPATH}/${term}`, this.authenticationService.jwt())
      .map(response => response.json() as TodoSearch[]);
  }
}
