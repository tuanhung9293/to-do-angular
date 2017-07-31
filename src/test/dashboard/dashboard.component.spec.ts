import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {Location, CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {TestBed, inject, async} from '@angular/core/testing';

import {DashboardComponent} from '../../app/dashboard';

@Component({
  template: ''
})
class TasklistStubComponent {
}

@Component({
  template: ''
})
class ProfileStubComponent {
}

describe('DashboardComponent', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          {path: 'tasklist', component: TasklistStubComponent},
          {path: 'profile', component: ProfileStubComponent}
        ])
      ],
      declarations: [DashboardComponent, TasklistStubComponent, ProfileStubComponent]
    });
  });

  it('should go to root url ',
    async(inject([Router, Location], (router: Router, location: Location) => {

      let fixture = TestBed.createComponent(DashboardComponent);
      fixture.detectChanges();

      let href = fixture.debugElement.query(By.css('#tasklist-route')).nativeElement.click();
      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/tasklist');
        console.log('after expect');
      });
    })));

  it('should go to /profile url ',
    async(inject([Router, Location], (router: Router, location: Location) => {

      let fixture = TestBed.createComponent(DashboardComponent);
      fixture.detectChanges();

      let href = fixture.debugElement.query(By.css('#profile-route')).nativeElement.getAttribute('href');
      fixture.whenStable().then(() => {
        expect(href).toEqual('/profile');
        console.log('after expect');
      });
    })));

  it('should show h2 html tag', () => {
    let fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toEqual('Manage');
  });
});
