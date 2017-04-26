import { browser, element, by } from 'protractor';
import { Login } from '../shared/login.po';
import { User } from '../shared/user.po';

describe('Create User Screen Tests', function () {

  let expectedMsg = 'Create New User';
  let loginObj: Login;
  let userObj: User;

  beforeEach(function () {
    loginObj = new Login();
    userObj = new User();

  });

  it('should display: ' + expectedMsg, function () {
    browser.get('');
    loginObj.login().then(() => {
      browser.sleep(5000);
      expect(element(by.css('h2')).getText()).toEqual(expectedMsg);
    }).catch((error: any) => console.log(error));
  });

  it('should contain countries', () => {
    browser.get('/create');

    userObj.getCountries().count().then(count => expect(count).toBe(6));
  });

  it('should insert a new user in the db', () => {
    browser.get('/create');
    userObj.setNameInput("Tyron");
    userObj.setSurnameInput("Surajpal");
    userObj.setCountryInput("South Africa");
    userObj.submitForm().then(() => {
      browser.sleep(2000);
      browser.getCurrentUrl().then(url => expect(url).toContain('/users'));
    }).catch((error: any) => console.log(error));

  });

});
