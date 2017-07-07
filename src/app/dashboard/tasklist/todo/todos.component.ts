// import {Component, OnInit, Input} from '@angular/core';
// import {TasklistService} from '../../../_services';
// import {Todo, Done} from '../../../_models';
//
// @Component({
//   selector: 'app-todos',
//   templateUrl: './authen.component.html'
// })
//
// export class TodosComponent implements OnInit {
//   @Input() tasklist_id: number;
//   newtodo: string;
//   todos: Todo[];
//   todos_toshow: Todo[];
//   dones_toshow: Todo[];
//
//   constructor(private tasklistService: TasklistService) {
//   }
//
//   ngOnInit(): void {
//     this.getTodos(this.tasklist_id);
//   }
//
//   getTodos(tasklist_id: number) {
//     this.tasklistService.getTodos(this.tasklist_id)
//       .then(
//         data => {
//           this.todos = data;
//           console.log('Get todos success');
//         })
//       .then(() => {
//           this.getTodos_toShow();
//           this.getDones_toShow();
//         }
//       )
//   }
//
//   addTodo(newtodo: string) {
//     this.tasklistService.addTodo(this.tasklist_id, newtodo)
//       .then(() => {
//           console.log(`Add todos ${newtodo} success`);
//           this.getTodos(this.tasklist_id);
//         }
//       )
//   }
//
//   doneTodo(todo_id: number) {
//     this.tasklistService.updateTodo(this.tasklist_id, todo_id)
//       .then(
//         data => {
//           console.log(`Done todo ${todo_id} success`);
//           this.getTodos(this.tasklist_id);
//         })
//   }
//
//   deleteDone(todo_id: number) {
//     this.tasklistService.deleteTodo(this.tasklist_id, todo_id)
//       .then(
//         data => {
//           console.log(`Delete todo ${todo_id} success`);
//           this.getTodos(this.tasklist_id);
//         })
//   }
//
//   getTodos_toShow() {
//     for (let i = 0; i < this.todos.length; i++) {
//       if (!this.todos[i].done) {
//         this.todos_toshow.push(this.todos[i])
//       }
//     }
//   }
//
//   getDones_toShow() {
//     for (let i = 0; i < this.todos.length; i++) {
//       if (this.todos[i].done) {
//         this.dones_toshow.push(this.todos[i])
//       }
//     }
//   }
//
//   doneAllTodos() {
//     for (let i = 0; i < (this.todos_toshow.length ); i++) {
//       this.doneTodo(this.todos_toshow[i].id);
//     }
//   }
//
//   deleteAllDones() {
//     for (let i = 0; i < (this.dones_toshow.length ); i++) {
//       this.deleteDone(this.dones_toshow[i].id);
//     }
//   }
// }


import {Component, OnInit, Input} from '@angular/core';
import {TasklistService} from '../../../_services';
import {Todo} from '../../../_models';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})

export class TodosComponent implements OnInit {
  @Input() tasklist_id: number;
  newtodo: string;
  todos: Todo[] = [];
  // todos_toshow: Todo[];
  // dones_toshow: Todo[];

  constructor(private tasklistService: TasklistService) {
  }

  ngOnInit(): void {
    this.getTodos(this.tasklist_id);
  }

  getTodos(tasklist_id: number) {
    this.tasklistService.getTodos(this.tasklist_id)
      .then(
        data => {
          this.todos = data;
          console.log('Get todos success');
        })
  }

  addTodo(newtodo: string) {
    this.tasklistService.addTodo(this.tasklist_id, newtodo)
      .then(() => {
          console.log(`Add todos ${newtodo} success`);
          this.getTodos(this.tasklist_id);
        }
      )
  }

  doneTodo(todo_id: number) {
    this.tasklistService.updateTodo(this.tasklist_id, todo_id)
      .then(
        data => {
          console.log(`Done todo ${todo_id} success`);
          this.getTodos(this.tasklist_id);
        })
  }

  deleteDone(todo_id: number) {
    this.tasklistService.deleteTodo(this.tasklist_id, todo_id)
      .then(
        data => {
          console.log(`Delete todo ${todo_id} success`);
          this.getTodos(this.tasklist_id);
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
