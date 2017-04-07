"use strict";
require("rxjs/add/operator/toPromise");
var LoginService = (function () {
    function LoginService() {
    }
    LoginService.prototype.login = function (loginDetails) {
        if (loginDetails.username.toLowerCase() === "tyron" && loginDetails.password === "12345") {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    };
    ;
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map