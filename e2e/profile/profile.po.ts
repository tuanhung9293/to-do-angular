import {browser, by, element} from 'protractor';

export function testProfilePage() {
  it('should display Login', () => {
    browser.get('/profile');
    expect(element(by.css('app-profile h3')).getText()).toEqual('Welcome tuung9293adsad@ail.com');
  });

  it('should show warning Email/Password required', () => {
    browser.get('/profile');
    element(by.css('app-profile input[name=password]')).sendKeys('');
    element(by.css('app-profile input[name=password_confirmation]')).sendKeys('');
    element(by.css('app-profile #submit_password')).click();

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

    browser.get('/profile');
    element(by.css('app-profile input[name=password]')).sendKeys('12346789');
    element(by.css('app-profile input[name=password_confirmation]')).sendKeys('12346789');
    element(by.css('app-profile #submit_password')).click();
  });

  it('should change Password fail when input password different password_confirmation', () => {
    browser.get('/profile');
    element(by.css('app-profile input[name=password]')).sendKeys('123456789');
    element(by.css('app-profile input[name=password_confirmation]')).sendKeys('aaabbbccc');
    element(by.css('app-profile #submit_password')).click();

    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/profile');
    expect(element(by.css('app-alert div')).getText()).toEqual('Change password fail');
  });

  it('should change Password fail when input password < 8 letters', () => {
    browser.get('/profile');
    element(by.css('app-profile input[name=password]')).sendKeys('1234567');
    element(by.css('app-profile input[name=password_confirmation]')).sendKeys('1234567');
    element(by.css('app-profile #submit_password')).click();

    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/profile');
    expect(element(by.css('app-alert div')).getText()).toEqual('Change password fail');
  });

  it('should navigate to /login when logout', () => {
    browser.get('/profile');
    element(by.css('app-profile #profile-logout-route')).click();

    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/login');
    expect(element(by.css('app-login h2')).getText()).toEqual('Login');
  });
};
