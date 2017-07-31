import {Component, OnInit, Input} from '@angular/core';
import {TasklistService, UserService} from '../../../_services';
import {User, Authen, Tasklist} from '../../../_models/';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html'
})

export class AuthenComponent implements OnInit {
  @Input() authorizedUsers: Authen[];
  @Input() tasklist: Tasklist;
  users: User[];

  constructor(private tasklistService: TasklistService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log('Get users success');
          this.users = this.users.filter(h => h.email !== this.userService.getCurrentUser()[0]);
          if (this.authorizedUsers) {
            this.authorizedUsers.forEach((item) => {
              item.user_email = this.users.filter(h => h.id === item.user_id)[0].email;
              this.users = this.users.filter(h => h.id !== item.user_id);
            })
          }
        },
        error => console.log('Get users fail')
      )
  }

  createAuthorizedUser(user_id: number) {
    this.tasklistService.createAuthorizedUser(this.tasklist.id, user_id)
      .subscribe(
        data => {
          this.authorizedUsers.push(data);
          let email = this.users.filter(h => h.id === data.user_id)[0].email;
          this.authorizedUsers[this.authorizedUsers.length - 1].user_email = email;
          console.log(`Create Authen users success`);

          this.tasklist.share++;
          this.users = this.users.filter(h => h.id !== user_id);
        },
        error => console.log('Create Authen users fail')
      )
  }

  deleteAuthorizedUser(user_id: number) {
    this.tasklistService.deleteAuthorizedUser(this.tasklist.id, user_id)
      .subscribe(
        data => {
          let email = this.authorizedUsers.filter(h => h.user_id === user_id)[0].user_email;
          this.users.push({id: user_id, email: email, password: ''});
          this.authorizedUsers = this.authorizedUsers.filter(h => h.user_id !== user_id);
          console.log(`Delete Authen users success`);

          this.tasklist.share--
        },
        error => console.log('Delete Authen users fail')
      )
  }

  updateAuthorizedUser(user_id: number) {
    let authen_user = this.authorizedUsers.filter(h => h.user_id === user_id)[0];
    this.tasklistService.updateAuthorizedUser(this.tasklist.id, user_id, !authen_user.is_write)
      .subscribe(
        data => {
          console.log(authen_user);
          authen_user.is_write = data.is_write;
          console.log('Update Authen users success');
        },
        error => console.log('Update Authen users fail')
      )
  }
}
