import {Component, OnInit, Input} from '@angular/core';
import {TasklistService, UserService} from '../../../_services';
import {User, Authen, Tasklist} from '../../../_models/';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html'
})

export class AuthenComponent implements OnInit {
  @Input() authen_users: Authen[];
  @Input() tasklist: Tasklist;
  users: User[];

  constructor(private tasklistService: TasklistService,
              private userService: UserService) {
  }

  getUsers() {
    this.userService.getUsers()
      .then(
        data => {
          this.users = data;
          console.log('Get users success');
        })
      .then(() => {
          this.users = this.users.filter(h => h.email !== this.userService.getCurrentUser()[0]);
          if (this.authen_users) {
            this.authen_users.forEach((item) => {
              item.user_email = this.users.filter(h => h.id === item.user_id)[0].email;
              this.users = this.users.filter(h => h.id !== item.user_id);
            })
          }
        }
      )
  }

  createAuthenTasklist(user_id: number) {
    this.tasklistService.createAuthenTasklist(this.tasklist.id, user_id)
      .then(
        data => {
          this.authen_users.push(data);
          let email = this.users.filter(h => h.id === data.user_id)[0].email;
          this.authen_users[this.authen_users.length - 1].user_email = email;
          console.log(`Create Authen users success`);
        })
      .then(() => {
        this.tasklist.share++;
        this.users = this.users.filter(h => h.id !== user_id);
      })
  }

  deleteAuthenTasklist(user_id: number) {
    this.tasklistService.deleteAuthenTasklist(this.tasklist.id, user_id)
      .then(
        data => {
          let email = this.authen_users.filter(h => h.user_id === user_id)[0].user_email;
          this.users.push({id: user_id, email: email, password: ''});
          this.authen_users = this.authen_users.filter(h => h.user_id !== user_id);
          console.log(`Delete Authen users success`);
        })
      .then(() => this.tasklist.share--)
  }

  updateAuthenTasklist(user_id: number) {
    let authen_user = this.authen_users.filter(h => h.user_id === user_id)[0];
    this.tasklistService.updateAuthenTasklist(this.tasklist.id, user_id, !authen_user.is_write)
      .then(
        data => {
          authen_user.is_write = data.is_write;
          console.log(`Update Authen users ${user_id} is write ${authen_user.is_write} success`);
        })
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
