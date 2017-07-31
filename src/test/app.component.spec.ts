import {
  async, ComponentFixture, TestBed
} from '@angular/core/testing';

import {Component} from '@angular/core';

import {AppComponent} from '../app/app.component';

import {RouterTestingModule} from '@angular/router/testing';

@Component({selector: 'app-alert', template: ''})
class AlertStubComponent {
}


let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        AlertStubComponent
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
      });
  }));
  it('should create the app', async(() => {
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have 'a' html tag `, async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a').textContent).toEqual('Angular 2 Training make by Tuan Ho');
  }));
});

