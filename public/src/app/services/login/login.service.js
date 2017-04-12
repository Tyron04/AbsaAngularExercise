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
var server_config_1 = require("../../config/server.config");
var http_1 = require("@angular/http");
var LoginService = (function () {
    function LoginService(router, http) {
        this.router = router;
        this.http = http;
        this.authUrl = server_config_1.serverConfig.protocol + "://" + server_config_1.serverConfig.hostname + ":" + server_config_1.serverConfig.port + "/api/auth";
    }
    LoginService.prototype.handleAuthentication = function () {
        if (!this.isAuthenticated()) {
            this.router.navigate(['/login']);
        }
        else {
            this.router.navigate(['/create']);
        }
    };
    LoginService.prototype.login = function (loginDetails) {
        var _this = this;
        var username = loginDetails.username;
        var password = loginDetails.password;
        var loginUrl = this.authUrl + "/login";
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var encoded = btoa(username + ":" + password);
        headers.append("Authorization", "Basic " + encoded);
        this.http.post(loginUrl, { body: "" }, { headers: headers })
            .toPromise().catch(this.handleError)
            .then(function (response) {
            if (response.ok) {
                localStorage.setItem('id_token', response.json());
                _this.router.navigate(['/create']);
            }
            else {
                return alert("Invalid username/password");
            }
        });
    };
    LoginService.prototype.isAuthenticated = function () {
        var tokenEncoded = localStorage.getItem('id_token');
        if (tokenEncoded !== null) {
            var tokenDecoded = atob(tokenEncoded);
            var tokenInfo = tokenDecoded.split('|');
            if (tokenInfo.length > 2) {
                var username = tokenInfo[0];
                var authToken = tokenInfo[1];
                var tokenExpiry = tokenInfo[2];
                if (username !== "" && authToken !== "") {
                    var tokenExpiryDate = new Date(tokenExpiry);
                    var now = new Date();
                    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                    if (tokenExpiryDate > now_utc) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    ;
    LoginService.prototype.logout = function () {
        localStorage.removeItem('id_token');
        this.router.navigate(['/login']);
    };
    ;
    LoginService.prototype.handleError = function (error) {
        console.error('An error occurred while performing user operations', error);
        return Promise.reject(error.message || error);
    };
    ;
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map