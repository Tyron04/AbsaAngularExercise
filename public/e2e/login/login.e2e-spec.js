"use strict";
var protractor_1 = require("protractor");
var login_po_1 = require("../shared/login.po");
describe('Login Tests', function () {
    var expectedMsg = 'Welcome to the Absa Exercise Portal';
    var loginObj;
    beforeEach(function () {
        loginObj = new login_po_1.Login();
        protractor_1.browser.get('');
    });
    it('should display: ' + expectedMsg, function () {
        expect(protractor_1.element(protractor_1.by.css('h1')).getText()).toEqual(expectedMsg);
    });
    it('should log in a user with trusted credentials', function () {
        expect(loginObj.getSubmitButton().isEnabled()).toEqual(false);
        loginObj.login().then(function () {
            protractor_1.browser.getCurrentUrl().then(function (url) { return expect(url).toContain('/create#access_token='); });
            protractor_1.browser.sleep(2000);
            expect(protractor_1.element(protractor_1.by.css('h2')).getText()).toEqual('Create New User');
        }).catch(function (error) { return console.log(error); });
    });
});
//# sourceMappingURL=login.e2e-spec.js.map