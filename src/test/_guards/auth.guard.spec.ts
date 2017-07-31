import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {async, TestBed, inject} from '@angular/core/testing';
import {AuthGuard} from '../../app/_guards';

describe('Testing AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],
      imports: [RouterTestingModule]
    });
  });

  let fakeLocalStorage = {
    'headers': {
      'Uid': 'fakeUid',
      'Client': 'fakeClient',
      'Access-Token': 'fakeAccess-Token'
    }
  };

  it('checks if have Token', async(inject([AuthGuard, Router], (auth, router) => {
      localStorage.setItem('currentUser', JSON.stringify(fakeLocalStorage));
      spyOn(router, 'navigate');
      expect(auth.canActivate()).toBeTruthy();
      expect(router.navigate).not.toHaveBeenCalled();
    })
  ));

  it('checks if NOT have Token', async(inject([AuthGuard, Router], (auth, router) => {
      localStorage.removeItem('currentUser');
      spyOn(router, 'navigate');
      expect(auth.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalled();
    })
  ));
});


