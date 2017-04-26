"use strict";
var protractor_1 = require("protractor");
var login_po_1 = require("../shared/login.po");
var user_po_1 = require("../shared/user.po");
describe('Create User Screen Tests', function () {
    var expectedMsg = 'Create New User';
    var loginObj;
    var userObj;
    beforeEach(function () {
        loginObj = new login_po_1.Login();
        userObj = new user_po_1.User();
    });
    it('should display: ' + expectedMsg, function () {
        protractor_1.browser.get('');
        loginObj.login().then(function () {
            protractor_1.browser.sleep(5000);
            expect(protractor_1.element(protractor_1.by.css('h2')).getText()).toEqual(expectedMsg);
        }).catch(function (error) { return console.log(error); });
    });
    it('should contain countries', function () {
        protractor_1.browser.get('/create');
        userObj.getCountries().count().then(function (count) { return expect(count).toBe(6); });
    });
    it('should insert a new user in the db', function () {
        protractor_1.browser.get('/create');
        userObj.setNameInput("Tyron");
        userObj.setSurnameInput("Surajpal");
        userObj.setCountryInput("South Africa");
        userObj.submitForm().then(function () {
            protractor_1.browser.sleep(2000);
            protractor_1.browser.getCurrentUrl().then(function (url) { return expect(url).toContain('/users'); });
        }).catch(function (error) { return console.log(error); });
    });
});
//# sourceMappingURL=createUser.e2e-spec.js.map