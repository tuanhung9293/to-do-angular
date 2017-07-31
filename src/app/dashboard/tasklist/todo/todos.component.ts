import {Component, OnInit, Input} from '@angular/core';

import {TasklistService} from '../../../_services';
import {Todo, Tasklist} from '../../../_models';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})

export class TodosComponent implements OnInit {
  @Input() tasklist: Tasklist;
  newtodo: string;
  todos: Todo[] = [];

  constructor(private tasklistService: TasklistService) {
  }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.tasklistService.getTodos(this.tasklist.id)
      .subscribe(
        data => {
          this.todos = data;
          this.tasklist.count = 0;
          data.forEach((item) => {
            if (!item.done) {
              this.tasklist.count++
            }
          });
          this.tasklist.done = data.length - this.tasklist.count;
          console.log('Get todos success');
        },
        error => console.log('Get todos fail')
      )
  }

  addTodo(newtodo: string) {
    this.tasklistService.addTodo(this.tasklist.id, newtodo)
      .subscribe(
        () => {
          console.log(`Add todos ${newtodo} success`);
          this.getTodos();
        },
        error => console.log(`Add todos ${newtodo} fail`)
      )
  }

  updateTodo(todo_id: number) {
    this.tasklistService.updateTodo(this.tasklist.id, todo_id)
      .subscribe(
        data => {
          console.log(`Done todo ${todo_id} success`);
          this.getTodos();
        },
        error => console.log(`Done todo ${todo_id} fail`)
      )
  }

  deleteTodo(todo_id: number) {
    this.tasklistService.deleteTodo(this.tasklist.id, todo_id)
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
}
