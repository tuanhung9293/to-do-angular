import {browser, by, element} from 'protractor';

export function testRegisterPage() {
  it('should display Register', () => {
    browser.get('/register');
    expect(element(by.css('app-register h2')).getText()).toEqual('Register');
  });

  it('should navigate to Login when click "Cancel"', () => {
    let cancelButton = element(by.linkText('Cancel'));
    cancelButton.click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/login');
    expect(element(by.css('app-login h2')).getText()).toEqual('Login');
  });

  it('should display /register Url', () => {
    browser.get('/register');
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/register');
  });

  it('should show warning Email/Password required', () => {
    browser.get('/register');
    element(by.css('input[type=email]')).sendKeys('');
    element(by.css('input[type=password]')).sendKeys('');
    element(by.tagName('button')).click();
    expect(element(by.css('app-register #email_warning')).getText()).toEqual('Email is required');
    expect(element(by.css('app-register #password_warning')).getText()).toEqual('Password is required');
  });

  it('should navigate to /login if register success', () => {
    browser.get('/register');
    element(by.css('input[type=email]')).sendKeys('tuung9293asadsad@ail.com');
    element(by.css('input[type=password]')).sendKeys('12346789');
    element(by.tagName('button')).click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/login');
    expect(element(by.css('app-login h2')).getText()).toEqual('Login');
  });
};

