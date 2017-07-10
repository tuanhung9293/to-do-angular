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

  getUsers() {
    this.userService.getUsers()
      .then((data) => {
        this.users = data;
      })
  }

  getTasklists() {
    this.tasklistService.getTasklists()
      .then(
        data => {
          this.data = data;
          this.data.forEach((item) => {
            item.owner = true;
            item.is_write = true;
            item.user = this.userService.getCurrentUser();
          });
          console.log('Get tasklists success');
        })
      .then(() => {
        this.data.forEach((item, index) => {
          this.get_users_authed_each_Tasklist(item.id, index)
        })
      })
      .then(() => {
          this.get_authen_Tasklist();
        }
      )
  }

  get_authen_Tasklist() {
    this.tasklistService.get_authen_Tasklist()
      .then(
        data => {
          data.forEach((item) => {
            item.user = this.users.filter(h => h.id === item.user_id)[0].email;
          });
          this.data = this.data.concat(data);
          console.log('Get authen tasklists success');
        })
  }

  get_users_authed_each_Tasklist(tasklist_id: number, data_id: number) {
    this.tasklistService.get_users_authed_each_Tasklist(tasklist_id)
      .then(
        data => {
          this.data[data_id].share = data.length;
          this.data[data_id].authen_users = data;
          console.log('Get who authed tasklists success');
        })
  }

  ngOnInit(): void {
    this.getTasklists();
    this.getUsers();
  }

  deleteTasklist(id: number): void {
    this.tasklistService.deleteTasklist(id)
      .then(() => {
        this.data = this.data.filter(h => h.id !== id);
      });
  }

  addTasklist(tasklistName: string) {
    this.tasklistService.addTasklist(tasklistName)
      .then((response) => {
          this.getTasklists();
          console.log('Create tasklist success');
        }
      )
  }

  updateTasklist(tasklist_id: number, tasklist_name: string): void {
    this.tasklistService.updateTasklist(tasklist_id, tasklist_name)
      .then(() => console.log('Rename tasklist success'))
      .catch(() => this.getTasklist(tasklist_id))
  }

  getTasklist(tasklist_id: number) {
    this.tasklistService.getTasklist(tasklist_id)
      .then((data) => this.data.filter(h => h.id === tasklist_id)[0].name = data.name)
      .then(() => console.log(`Get tasklist ${tasklist_id} success`))
  }

  gotoDetail(tasklist_id: number): void {
    this.router.navigate(['/detail', tasklist_id])
  }
}
