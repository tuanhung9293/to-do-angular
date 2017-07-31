import {browser, by, element} from 'protractor';

export function testProfilePage() {
  it('should display Login', () => {
    browser.get('/profile');
    expect(element(by.css('app-profile h3')).getText()).toEqual('Welcome tuung9293adsad@ail.com');
  });

  it('should show warning Email/Password required', () => {
    browser.get('/profile');
    element(by.css('app-profile input[name=password]')).sendKeys('');
    element(by.css('app-profile input[[name=password_confirmation]')).sendKeys('');
    element(by.css('app-profile button')).click();
    expect(element(by.css('app-profile #password_warning')).getText()).toEqual('Password is required');
    expect(element(by.css('app-profile #password_confirmation_warning')).getText()).toEqual('Password confirmation is required');
  });

  it('should change Password success when input PERFECT data', () => {
    browser.get('/profile');
    element(by.css('app-profile input[name=password]')).sendKeys('123456789');
    element(by.css('app-profile input[name=password_confirmation]')).sendKeys('123456789');

    element(by.css('app-profile #submit_password')).click();

    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/');
    expect(element(by.css('app-alert div')).getText()).toEqual('Change password success');
    expect(element(by.css('app-alert div')).getText()).not.toEqual('Change password fail');
  });
};
