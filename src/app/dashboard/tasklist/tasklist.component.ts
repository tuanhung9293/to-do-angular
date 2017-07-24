import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Tasklist, User} from '../../_models';
import {TasklistService, UserService} from '../../_services';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html'
})
export class TasklistComponent implements OnInit {
  data: Tasklist[];
  users: User[];

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'id';
  public sortOrder = 'asc';

  constructor(private tasklistService: TasklistService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getTasklists();
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => this.users = data)
  }

  getTasklists() {
    this.tasklistService.getTasklists()
      .subscribe(
        data => {
          this.data = data;
          this.data.forEach((item) => {
            item.owner = true;
            item.is_write = true;
            item.user = this.userService.getCurrentUser();
          });
          console.log('Get tasklists success');
          this.data.forEach((item, index) => {
            this.getAuthorizedUsers(item.id, index)
          });
          this.getTasklistsAuthorized();
        })
  }

  getTasklistsAuthorized() {
    this.tasklistService.getTasklistsAuthorized()
      .subscribe(
        data => {
          data.forEach((item) => {
            item.user = this.users.filter(h => h.id === item.user_id)[0].email;
          });
          this.data = this.data.concat(data);
          console.log('Get authen tasklists success');
        })
  }

  getAuthorizedUsers(tasklist_id: number, data_id: number) {
    this.tasklistService.getAuthorizedUsers(tasklist_id)
      .subscribe(
        data => {
          this.data[data_id].share = data.length;
          this.data[data_id].authorizedUsers = data;
          console.log('Get who authed tasklists success');
        })
  }

  getTasklist(tasklist_id: number) {
    this.tasklistService.getTasklist(tasklist_id)
      .subscribe(
        data => {
          this.data.filter(h => h.id === tasklist_id)[0].name = data.name;
          console.log(`Get tasklist ${tasklist_id} success`);
        }
      )
  }

  createTasklist(tasklistName: string) {
    this.tasklistService.createTasklist(tasklistName)
      .subscribe(
        response => {
          this.data.push(response);
          this.data[this.data.length - 1].is_write = true;
          this.data[this.data.length - 1].owner = true;
          this.data[this.data.length - 1].share = 0;
          this.data[this.data.length - 1].user = this.userService.getCurrentUser();
          this.data[this.data.length - 1].authorizedUsers = [];
          console.log('Create tasklist success');
        }
      )
  }

  updateTasklist(tasklist_id: number, tasklist_name: string): void {
    this.tasklistService.updateTasklist(tasklist_id, tasklist_name)
      .subscribe(
        () => console.log('Rename tasklist success'),
        () => this.getTasklist(tasklist_id))
  }

  deleteTasklist(id: number): void {
    this.tasklistService.deleteTasklist(id)
      .subscribe(() => this.data = this.data.filter(h => h.id !== id))
  }
}
