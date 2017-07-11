import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, UserService} from '../_services/index';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent {
  userRegister: any = {};
  loading = false;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
  }

  register() {
    this.loading = true;
    this.userService.createUser(this.userRegister)
      .then(() => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        })
      .catch(error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }
}
