"use strict";
var protractor_1 = require("protractor");
var User = (function () {
    function User() {
    }
    User.prototype.getContainer = function () {
        return protractor_1.element(protractor_1.by.css('form'));
    };
    User.prototype.getNameInput = function () {
        return protractor_1.element(protractor_1.by.css("input[formControlName=name]"));
    };
    User.prototype.getSurnameInput = function () {
        return protractor_1.element(protractor_1.by.css("input[formControlName=surname]"));
    };
    User.prototype.getCountryInput = function () {
        return protractor_1.element(protractor_1.by.css("select[formControlName=country]"));
    };
    User.prototype.getCountries = function () {
        return protractor_1.element.all(protractor_1.by.css("select[formControlName=country] option"));
    };
    User.prototype.getSubmitButton = function () {
        return protractor_1.element(protractor_1.by.css('button[type=submit]'));
    };
    User.prototype.setNameInput = function (name) {
        this.getNameInput().sendKeys(name);
    };
    User.prototype.setSurnameInput = function (surname) {
        this.getSurnameInput().sendKeys(surname);
    };
    User.prototype.setCountryInput = function (country) {
        this.getCountryInput().sendKeys(country);
    };
    User.prototype.submitForm = function () {
        return this.getSubmitButton().click();
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.po.js.map