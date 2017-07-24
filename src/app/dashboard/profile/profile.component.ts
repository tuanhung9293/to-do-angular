import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, UserService} from '../../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  newPassword: any = {};
  current_user: string;

  constructor(private userService: UserService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.current_user = this.userService.getCurrentUser();
  }

  changePassword() {
    this.userService.changePassword(this.newPassword)
      .subscribe(
        data => {
          this.router.navigate(['/']);
          console.log('Change password success');
        },
        error => {
          this.alertService.error(error);
        })
  }
}
