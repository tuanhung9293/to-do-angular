import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';
import {TasklistService} from '../../../_services';
import {Todo, Tasklist} from '../../../_models';

@Component({
  selector: 'app-tododetail',
  templateUrl: './todo-detail.component.html'
})

export class TodoDetailComponent implements OnInit {
  tasklistDetailId: number;
  tasklistDetail: Tasklist;
  tasklistsAuthorized: Tasklist[];
  newtodo: string;
  todos: Todo[] = [];

  constructor(private tasklistService: TasklistService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.tasklistDetailId = (+this.route.params['_value'].task_list_id);
    this.getTasklistsAuthorized()
  }

  getTasklistsAuthorized() {
    this.tasklistService.getTasklistsAuthorized()
      .subscribe(
        data => {
          this.tasklistsAuthorized = data.filter(h => h.id === this.tasklistDetailId);
          if (this.tasklistsAuthorized.length === 0) {
            this.getTasklistDetail()
          } else {
            this.tasklistDetail = this.tasklistsAuthorized[0];
            this.getTodos();
          }
          console.log('getTasklistsAuthorized success');
        },
        error => console.log('getTasklistsAuthorized fail')
      )
  }

  getTasklistDetail() {
    this.tasklistService.getTasklist(this.tasklistDetailId)
      .subscribe(
        data => {
          this.tasklistDetail = data;
          this.tasklistDetail.is_write = true;
          this.getTodos();
          console.log('getTasklist succsess');
        },
        error => console.log('getTasklist fail')
      )
  }

  getTodos() {
    this.tasklistService.getTodos(this.tasklistDetailId)
      .subscribe(
        data => {
          this.todos = data;
          this.tasklistDetail.count = 0;
          this.tasklistDetail.done = 0;
          data.forEach(h => {
            if (!h.done) {
              this.tasklistDetail.count++
            }
            if (h.done) {
              this.tasklistDetail.done++
            }
          });
          console.log('Get todos success');
        },
        error => console.log('Get todos fail'))
  }


  addTodo(newtodo: string) {
    this.tasklistService.addTodo(this.tasklistDetailId, newtodo)
      .subscribe(
        () => {
          console.log(`Add todos ${newtodo} success`);
          this.getTodos();
        },
        error => console.log(`Add todos ${newtodo} fail`)
      )
  }

  updateTodo(todo_id: number) {
    this.tasklistService.updateTodo(this.tasklistDetailId, todo_id)
      .subscribe(
        data => {
          console.log(`Done todo ${todo_id} success`);
          this.getTodos();
        },
        error => console.log(`Done todo ${todo_id} fail`)
      )
  }

  deleteTodo(todo_id: number) {
    this.tasklistService.deleteTodo(this.tasklistDetailId, todo_id)
      .subscribe(
        data => {
          console.log(`Delete todo ${todo_id} success`);
          this.getTodos();
        },
        error => console.log(`Delete todo ${todo_id} fail`)
      )
  }

  doneAllTodos() {
    this.todos.forEach((item) => {
      if (!item.done) {
        this.updateTodo(item.id);
      }
    });
    console.log('Done all todos');
  }

  deleteAllDones() {
    this.todos.forEach((item) => {
      if (item.done) {
        this.deleteTodo(item.id);
      }
    });
    console.log('Delete all dones');
  }

  goBack(): void {
    this.location.back();
  }
}
