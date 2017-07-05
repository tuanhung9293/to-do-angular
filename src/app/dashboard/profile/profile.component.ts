import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, UserService} from '../../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  model: any = {};

  constructor(private userService: UserService,
              private router: Router,
              private alertService: AlertService) {
  }

  changePassword() {
    this.userService.changePassword(this.model)
      .then(
        data => {
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['/']);
          console.log('Change password success');
        })
      .catch(error => {
        this.alertService.error(error);
      });
  }
}
