import {browser, by, element} from 'protractor';

export function testLoginPage() {
  xit('should display Login', () => {
    browser.get('/login');
    expect(element(by.css('app-login h2')).getText()).toEqual('Login');
  });

  xit('should navigate to Login when click "Register"', () => {
    let registerButton = element(by.linkText('Register'));
    registerButton.click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/register');
    expect(element(by.css('app-register h2')).getText()).toEqual('Register');
  });

  xit('should display /login Url', () => {
    browser.get('/login');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/login');
  });

  xit('should show warning Email/Password required', () => {
    browser.get('/login');
    element(by.css('app-login input[type=email]')).sendKeys('');
    element(by.css('app-login input[type=password]')).sendKeys('');
    element(by.css('app-login button')).click();
    expect(element(by.css('app-login #email_warning')).getText()).toEqual('Email is required');
    expect(element(by.css('app-login #password_warning')).getText()).toEqual('Password is required');
  });

  it('should navigate to root Url if login success', () => {
    browser.get('/login');
    element(by.css('app-login input[type=email]')).sendKeys('tuung9293adsad@ail.com');
    element(by.css('app-login input[type=password]')).sendKeys('12346789');
    element(by.css('app-login button')).click();
    expect(element(by.css('app-dashboard h2')).getText()).toEqual('Manage');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/');
  });
};
