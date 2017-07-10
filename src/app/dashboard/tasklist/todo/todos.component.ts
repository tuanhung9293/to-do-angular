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
      .then(
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
        })
  }

  addTodo(newtodo: string) {
    this.tasklistService.addTodo(this.tasklist.id, newtodo)
      .then(() => {
          console.log(`Add todos ${newtodo} success`);
          this.getTodos();
        }
      )
  }

  doneTodo(todo_id: number) {
    this.tasklistService.updateTodo(this.tasklist.id, todo_id)
      .then(
        data => {
          console.log(`Done todo ${todo_id} success`);
          this.getTodos();
        })
  }

  deleteDone(todo_id: number) {
    this.tasklistService.deleteTodo(this.tasklist.id, todo_id)
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
}
