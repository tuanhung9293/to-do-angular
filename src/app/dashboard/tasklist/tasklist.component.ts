// import {Component} from '@angular/core';
// import {UserService} from '../../_services';
// import {Tasklist} from '../../_models';
//
// const TASKLISTS: Tasklist[] = [
//   {id: 0, name: 'Zero'},
//   {id: 11, name: 'Mr. Nice'},
//   {id: 12, name: 'Narco'},
//   {id: 0, name: 'Zero'},
//   {id: 11, name: 'Mr. Nice'},
//   {id: 12, name: 'Narco'},
//   {id: 0, name: 'Zero'},
//   {id: 11, name: 'Mr. Nice'},
//   {id: 12, name: 'Narco'}
// ]
//
// @Component({
//   selector: 'app-tasklist',
//   templateUrl: './tasklist2.component.html'
// })
// export class TasklistComponent {
//   tasklists = TASKLISTS;
//   constructor(
//     private userService: UserService) { }
//   addTasklist(name: string) {
//     this.userService.createTasklist(name)
//   }
//   getAll() {
//     this.userService.getAll()
//   }
// }

import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {Tasklist} from '../../_models';

const TASKLISTS: Tasklist[] = [
  {id: 0, name: 'Zero'},
  {id: 11, name: 'Mr. Nice'},
  {id: 12, name: 'Narco'},
  {id: 0, name: 'Zero'},
  {id: 11, name: 'Mr. Nice'},
  {id: 12, name: 'Narco'},
  {id: 0, name: 'Zero'},
  {id: 11, name: 'Mr. Nice'},
  {id: 12, name: 'Narco'}
]

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist2.component.html'
})
export class TasklistComponent {

  public data = TASKLISTS;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';

  constructor(private http: Http) {
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.city.length;
  }

}
