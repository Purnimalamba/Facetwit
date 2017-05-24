import { FacebookAppPage } from './app.po';

describe('facebook-app App', () => {
  let page: FacebookAppPage;

  beforeEach(() => {
    page = new FacebookAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
