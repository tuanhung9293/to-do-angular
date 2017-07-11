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
  tasklistDetail_id: number;
  tasklistDetail: Tasklist;
  authenTasklists: Tasklist[];
  newtodo: string;
  todos: Todo[] = [];

  constructor(private tasklistService: TasklistService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.tasklistDetail_id = (+this.route.params['_value'].task_list_id);
    this.getAuthenTasklists()
  }

  getAuthenTasklists() {
    this.tasklistService.get_authen_Tasklist()
      .then((data) => {
        this.authenTasklists = data.filter(h => h.id === this.tasklistDetail_id)
      })
      .then(() => {
        if (this.authenTasklists.length === 0) {
          this.getTasklistDetail()
        } else {
          this.tasklistDetail = this.authenTasklists[0];
          console.log(this.tasklistDetail);
          this.getTodos();
        }
      })
  }

  getTasklistDetail() {
    this.tasklistService.getTasklist(this.tasklistDetail_id)
      .then((data) => this.tasklistDetail = data)
      .then(() => this.tasklistDetail.is_write = true)
      .then(() => console.log(this.tasklistDetail))
      .then(() => this.getTodos())
  }

  getTodos() {
    this.tasklistService.getTodos(this.tasklistDetail_id)
      .then(
        data => {
          this.todos = data;
          console.log('Get todos success');
        })
  }


  addTodo(newtodo: string) {
    this.tasklistService.addTodo(this.tasklistDetail_id, newtodo)
      .then(() => {
          console.log(`Add todos ${newtodo} success`);
          this.getTodos();
        }
      )
  }

  doneTodo(todo_id: number) {
    this.tasklistService.updateTodo(this.tasklistDetail_id, todo_id)
      .then(
        data => {
          console.log(`Done todo ${todo_id} success`);
          this.getTodos();
        })
  }

  deleteDone(todo_id: number) {
    this.tasklistService.deleteTodo(this.tasklistDetail_id, todo_id)
      .then(
        data => {
          console.log(`Delete todo ${todo_id} success`);
          this.getTodos();
        })
  }

  doneAllTodos() {
    for (let i = 0; i < (this.todos.length ); i++) {
      if (!this.todos[i].done) {
        this.doneTodo(this.todos[i].id);
      }
    }
    console.log('Done all todos');
  }

  deleteAllDones() {
    for (let i = 0; i < (this.todos.length ); i++) {
      if (this.todos[i].done) {
        this.deleteDone(this.todos[i].id);
      }
    }
    console.log('Delete all dones');
  }

  goBack(): void {
    this.location.back();
  }
}
