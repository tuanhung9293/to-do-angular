import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {Tasklist, Authen} from '../../_models';
import {TasklistService, UserService} from '../../_services';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html'
})
export class TasklistComponent implements OnInit {
  data: Tasklist[];

  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';

  constructor(private tasklistService: TasklistService,
              private userService: UserService) {
  }

  getTasklists() {
    this.tasklistService.getTasklists()
      .then(
        data => {
          this.data = data;
          this.data.forEach((item) => {
            item.owner = true;
            item.user = this.userService.getCurrentUser();
          });
          console.log('Get tasklists success');
        })
      .then(() => {
        for (let i = 0; i < this.data.length; i++) {
          this.get_users_authed_each_Tasklist(this.data[i].id, i)
        }
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
          // this.data.push(response);
          console.log('Create tasklist success');
        }
      )
  }

  updateTasklist(id: number, tasklist_name: string): void {
    this.tasklistService.updateTasklist(id, tasklist_name)
      .then(() => {
        console.log('Rename tasklist success');
        this.getTasklists();
      });
  }

}
