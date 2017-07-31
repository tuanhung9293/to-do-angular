import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AlertService, AuthenticationService} from '../_services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  userLogin: any = {};
  loading = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.userLogin.email, this.userLogin.password)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error('Email or password is wrong!');
          this.loading = false;
        });
  }
}
