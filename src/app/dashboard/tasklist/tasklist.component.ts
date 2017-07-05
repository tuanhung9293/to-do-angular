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
import {UserService} from '../../_services/user.service';

const TASKLISTS: Tasklist[] = [
  {id: 0, name: 'Zero', user: 'thomas', share: 3, count: 3, done: 12},
  {id: 11, name: 'Mr. Nice', user: 'richad', share: 44, count: 12, done: 4},
  {id: 12, name: 'Narco', user: 'robin', share: 2, count: 1, done: 5},
  {id: 0, name: 'Zero', user: 'messi', share: 2, count: 2, done: 6},
  {id: 11, name: 'Mr. Nice', user: 'vilen', share: 56, count: 3, done: 77},
  {id: 12, name: 'Narco', user: 'micheal', share: 5, count: 11, done: 43},
  {id: 0, name: 'Zero', user: 'thomas', share: 8, count: 5, done: 21},
  {id: 11, name: 'Mr. Nice', user: 'maria', share: 9, count: 66, done: 34},
  {id: 12, name: 'Narco', user: 'conlude', share: 3, count: 6, done: 49}
];

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist2.component.html'
})
export class TasklistComponent implements OnInit {
  data: Tasklist[];

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';

  constructor(private userService: UserService) {
  }

  getTasklists() {
    this.userService.getTasklists()
      .then(
        data => {
          this.data = data;
          console.log('Get tasklists success');
        })
  }

  ngOnInit(): void {
    this.getTasklists();
  }

  deleteTasklist(id: number): void {
    this.userService.deleteTasklist(id)
      .then(() => {
        this.data = this.data.filter(h => h.id !== id);
      });
  }

  getTodos(id: number) {
    this.userService.getTodos(id)
      .then(
        data => {
          console.log('Get todos success');
        })
  }

  addTasklist(tasklistName: string) {
    this.userService.addTasklist(tasklistName)
      .then((response) => {
          this.getTasklists();
          // this.data.push(response);
          console.log('Create tasklist success');
        }
      )
  }
}
