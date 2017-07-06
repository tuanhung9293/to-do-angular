import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {Tasklist} from '../../_models';
import {TasklistService} from '../../_services';

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

  constructor(private tasklistService: TasklistService) {
  }

  getTasklists() {
    this.tasklistService.getTasklists()
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
