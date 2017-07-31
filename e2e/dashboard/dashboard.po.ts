import {browser, by, element} from 'protractor';

export function testDashboardPage() {
  xit('should display Dashboard', () => {
    browser.get('/');
    expect(element(by.css('app-dashboard h2')).getText()).toEqual('Manage');
  });

  it('should navigate to Profile when click "Profile"', () => {
    browser.get('/');
    let profileButton = element(by.linkText('Profile'));
    profileButton.click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/profile');
    expect(element(by.css('app-profile h3')).getText()).toMatch('Welcome');
  });

  it('should navigate to Tasklist when click "Manage"', () => {
    browser.get('/profile');
    let tasklistButton = element(by.linkText('Manage'));
    tasklistButton.click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/');
    expect(element(by.css('app-tasklist label')).getText()).toMatch('Tasklist name:');
  });

  it('should display true CSS style', () => {
    browser.get('/');
    let nav_el = element(by.css('app-dashboard nav'));
    expect(nav_el.getCssValue('background-color')).toEqual('rgba(238, 238, 238, 1)');
  });
};
