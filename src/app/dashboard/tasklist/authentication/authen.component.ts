import {Component, OnInit, Input} from '@angular/core';
import {TasklistService, UserService} from '../../../_services';
import {User} from '../../../_models/';
import {Authen} from '../../../_models/';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html'
})

export class AuthenComponent implements OnInit {
  @Input() tasklist_id: number;
  @Input() authen_users: Authen[];
  users: User[];

  constructor(private tasklistService: TasklistService,
              private userService: UserService) {
  }

  getUsers() {
    this.userService.getUsers()
      .then(
        data => {
          this.users = data;
          console.log(this.users);
          console.log('Get users success');
          console.log(`data authen_users: ${JSON.stringify(this.authen_users)}`);
        })
  }

  createAuthenTasklist(user_id: number) {
    this.tasklistService.createAuthenTasklist(this.tasklist_id, user_id)
      .then(
        data => {
          this.users = data;
          console.log(`Create Authen users success`);
        })
  }

  deleteAuthenTasklist(user_id: number) {
    this.tasklistService.deleteAuthenTasklist(this.tasklist_id, user_id)
      .then(
        data => {
          this.users = data;
          console.log(`Delete Authen users success`);
        })
  }

  ngOnInit(): void {
    this.getUsers();
  }

//
// getTodos(tasklist_id: number) {
//   this.tasklistService.getTodos(this.tasklist_id)
//     .then(
//       data => {
//         this.todos = data;
//         console.log('Get todos success');
//       })
// }
//
// addTodo(newtodo: string) {
//   this.tasklistService.addTodo(this.tasklist_id, newtodo)
//     .then(() => {
//         console.log(`Add todos ${newtodo} success`);
//         this.getTodos(this.tasklist_id);
//       }
//     )
// }
//
// doneTodo(todo_id: number) {
//   this.tasklistService.updateTodo(this.tasklist_id, todo_id)
//     .then(
//       data => {
//         console.log(`Done todo ${todo_id} success`);
//         this.getTodos(this.tasklist_id);
//       })
// }
//
// deleteDone(todo_id: number) {
//   this.tasklistService.deleteTodo(this.tasklist_id, todo_id)
//     .then(
//       data => {
//         console.log(`Delete todo ${todo_id} success`);
//         this.getTodos(this.tasklist_id);
//       })
// }
}
