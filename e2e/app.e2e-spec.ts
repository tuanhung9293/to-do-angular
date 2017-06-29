import { ToDoAngularPage } from './app.po';

describe('to-do-angular App', () => {
  let page: ToDoAngularPage;

  beforeEach(() => {
    page = new ToDoAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
