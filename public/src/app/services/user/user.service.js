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
var http_1 = require("@angular/http");
var server_config_1 = require("../../config/server.config");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.usersUrl = server_config_1.serverConfig.protocol + "://" + server_config_1.serverConfig.hostname + ":" + server_config_1.serverConfig.port + "/api/users";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    UserService.prototype.getUsers = function () {
        console.log(this.usersUrl);
        return this.http.get(this.usersUrl)
            .map(function (response) { return response.json(); });
    };
    ;
    UserService.prototype.getUser = function (id) {
        var url = this.usersUrl + "/" + id;
        return this.http.get(url)
            .map(function (response) { return response.json(); });
    };
    ;
    UserService.prototype.create = function (user) {
        return this.http.post(this.usersUrl, user)
            .map(function (response) { return response.json(); });
    };
    ;
    UserService.prototype.update = function (user) {
        var url = this.usersUrl + "/" + user.Id;
        return this.http.put(url, user)
            .map(function (response) { return response.json(); });
    };
    ;
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred while performing user operations', error);
        return Promise.reject(error.message || error);
    };
    ;
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map