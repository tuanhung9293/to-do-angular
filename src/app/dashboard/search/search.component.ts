import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {SearchService} from '../../_services';
import {TodoSearch} from '../../_models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  todos: Observable<TodoSearch[]>;
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService,
              private router: Router) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.todos = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.searchService.searchTodo(term) : Observable.of<TodoSearch[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<TodoSearch[]>([]);
      });
  }

  gotoDetail(tasklist: TodoSearch): void {
    let link = ['/detail', tasklist.task_list_id];
    this.router.navigate(link);
  }
}
