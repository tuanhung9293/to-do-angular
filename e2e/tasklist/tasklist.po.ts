import {browser, by, element} from 'protractor';

export function testTasklistPage() {
  it('should show Tasklist Page', () => {
    browser.get('/');
    expect(element(by.css('app-tasklist #create_tasklist label')).getText()).toMatch('Tasklist name:');
    expect(element(by.css('app-tasklist #filter_tasklist label')).getText()).toMatch('Filter by name:');
    expect(element(by.css('app-tasklist app-search'))).toBeDefined();
    expect(element.all(by.css('app-tasklist #table_header th mfdefaultsorter')).count()).toEqual(6);
  });

  it('should disabled create tasklist when Input is empty', () => {
    let input = element(by.css('app-tasklist #create_tasklist input'));
    let button = element(by.css('app-tasklist #create_tasklist button'));

    input.sendKeys('');
    expect(button.getAttribute('disabled')).toBeTruthy();

    input.sendKeys('tasklist 0');
    expect(button.getAttribute('disabled')).toBeNull();
  });

  it('should create tasklist', () => {
    let input = element(by.css('app-tasklist #create_tasklist input'));
    let button = element(by.css('app-tasklist #create_tasklist button'));
    expect(element.all(by.css('app-tasklist #table_body tr')).count()).toEqual(0);

    button.click();
    expect(element.all(by.css('app-tasklist #table_body tr')).count()).toEqual(1);
    expect(element(by.css('app-tasklist .tl_name')).getText()).toBeDefined();
    expect(element(by.css('app-tasklist .tl_user')).getText()).toBeDefined();
    expect(element(by.css('app-tasklist .tl_share')).getText()).toEqual('0');
    expect(element(by.css('app-tasklist .tl_todo')).getText()).toEqual('0');
    expect(element(by.css('app-tasklist .tl_done')).getText()).toEqual('0');
  });

  it('should show tasklists', () => {
    browser.get('/');
    expect(element.all(by.css('app-tasklist #table_body tr')).count()).toEqual(1);
    expect(element(by.css('app-tasklist .tl_name')).getText()).toBeDefined();
    expect(element(by.css('app-tasklist .tl_user')).getText()).toBeDefined();
    expect(element(by.css('app-tasklist .tl_share')).getText()).toEqual('0');
    expect(element(by.css('app-tasklist .tl_todo')).getText()).toEqual('0');
    expect(element(by.css('app-tasklist .tl_done')).getText()).toEqual('0');
  });

  it('should show Edit-Modal when click Edit-button', () => {
    expect(element(by.css('app-tasklist .modal_edit')).getCssValue('display')).toEqual('none');
    element(by.css('app-tasklist .edit_tl_button')).click();
    browser.sleep(500);

    expect(element(by.css('app-tasklist .modal_edit')).getCssValue('display')).toEqual('block');
    expect(element(by.css('app-tasklist .modal_edit h4')).getText()).toEqual('Edit tasklist tasklist 0');
    element(by.css('app-tasklist .modal_edit_cancel')).click();
    browser.sleep(500);
  });

  it('should show Share-Modal when click Share-button', () => {
    expect(element(by.css('app-tasklist .modal_share')).getCssValue('display')).toEqual('none');
    element(by.css('app-tasklist .share_tl_button')).click();
    browser.sleep(500);

    expect(element(by.css('app-tasklist .modal_share')).getCssValue('display')).toEqual('block');
    expect(element(by.css('app-tasklist .modal_share h4')).getText()).toEqual('Share tasklist tasklist 0');
    element(by.css('app-tasklist .modal_share_close')).click();
    browser.sleep(500);
  });

  it('should show Detail-Modal when click Detail-button', () => {
    expect(element(by.css('app-todos .modal_detail')).getCssValue('display')).toEqual('none');
    element(by.css('app-tasklist .detail_tl_button')).click();
    browser.sleep(500);

    expect(element(by.css('app-todos .modal_detail')).getCssValue('display')).toEqual('block');
    expect(element(by.css('app-todos .modal_detail h4')).getText()).toEqual('Detail of tasklist tasklist 0');
    element(by.css('app-todos .modal_detail_close')).click();
    browser.sleep(500);
  });

  it('should show remove Tasklist when click Remove-button', () => {
    let input = element(by.css('app-tasklist #create_tasklist input'));
    let button = element(by.css('app-tasklist .delete_tl_button'));
    expect(element.all(by.css('app-tasklist #table_body tr')).count()).toEqual(1);

    button.click();
    expect(element.all(by.css('app-tasklist #table_body tr')).count()).toEqual(0);
  });
}
