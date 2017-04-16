"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var angular2_jwt_1 = require("angular2-jwt");
var auth_config_1 = require("../../config/auth.config");
var LoginService = (function () {
    function LoginService(router) {
        this.router = router;
        this.redirectUri = 'http://localhost:3000/create';
        this.auth0 = new auth0.WebAuth({
            domain: auth_config_1.myConfig.domain,
            clientID: auth_config_1.myConfig.clientID,
            redirectUri: this.redirectUri,
            responseType: 'token id_token'
        });
    }
    LoginService.prototype.handleAuthentication = function () {
        var _this = this;
        this.auth0.parseHash({ _idTokenVerification: false }, function (err, authResult) {
            if (err) {
                alert("Error: " + err.errorDescription);
                _this.router.navigate(['/login']);
            }
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                _this.router.navigate(['/create']);
            }
        });
    };
    LoginService.prototype.login = function (loginDetails) {
        var username = loginDetails.username;
        var password = loginDetails.password;
        this.auth0.redirect.loginWithCredentials({
            connection: 'Username-Password-Authentication',
            username: username,
            password: password
        }, function (err) {
            if (err && err.description) {
                return alert(err.description);
            }
        });
    };
    LoginService.prototype.isAuthenticated = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    ;
    LoginService.prototype.logout = function () {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
    };
    ;
    LoginService.prototype.setUser = function (authResult) {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
    };
    ;
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map