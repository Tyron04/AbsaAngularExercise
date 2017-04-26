"use strict";
var protractor_1 = require("protractor");
var Login = (function () {
    function Login() {
    }
    Login.prototype.getContainer = function () {
        return protractor_1.element(protractor_1.by.css('.loginForm'));
    };
    Login.prototype.getUsernameInput = function () {
        return protractor_1.element(protractor_1.by.css("input[formControlName=username]"));
    };
    Login.prototype.getPasswordInput = function () {
        return protractor_1.element(protractor_1.by.css("input[formControlName=password]"));
    };
    Login.prototype.getSubmitButton = function () {
        return protractor_1.element(protractor_1.by.css('button'));
    };
    Login.prototype.login = function () {
        this.getUsernameInput().sendKeys('surajpal.tyron@gmail.com');
        this.getPasswordInput().sendKeys('P@$$w0rd');
        return this.getSubmitButton().click();
    };
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.po.js.map