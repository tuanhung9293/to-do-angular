import {Component} from '@angular/core';
import {UserService} from '../../_services';
import {Tasklist} from '../../_models';

const TASKLISTS: Tasklist[] = [
  {id: 0, name: 'Zero'},
  {id: 11, name: 'Mr. Nice'},
  {id: 12, name: 'Narco'}
]

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html'
})
export class TasklistComponent {
  tasklists = TASKLISTS;
  constructor(
    private userService: UserService) { }
  addTasklist(name: string) {
    this.userService.createTasklist(name)
  }
  getAll() {
    this.userService.getAll()
  }
}
