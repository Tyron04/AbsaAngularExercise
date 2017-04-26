import { browser, element, by, protractor } from 'protractor';
import { Login } from '../shared/login.po';

describe('Login Tests', function () {

    let expectedMsg = 'Welcome to the Absa Exercise Portal';
    let loginObj: Login;
    beforeEach(function () {
        loginObj = new Login();
        browser.get('');
    });

    it('should display: ' + expectedMsg, function () {
        expect(element(by.css('h1')).getText()).toEqual(expectedMsg);
    });

    it('should log in a user with trusted credentials', function () {
        expect(loginObj.getSubmitButton().isEnabled()).toEqual(false);
        loginObj.login().then(() => {
            browser.getCurrentUrl().then(url => expect(url).toContain('/create#access_token='));
            browser.sleep(2000);
            expect(element(by.css('h2')).getText()).toEqual('Create New User');
        }).catch((error: any) => console.log(error));
    });

});
