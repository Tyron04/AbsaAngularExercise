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
var login_service_1 = require("../services/login/login.service");
var AuthGuardModule = (function () {
    function AuthGuardModule(loginService, router) {
        this.loginService = loginService;
        this.router = router;
    }
    AuthGuardModule.prototype.canActivate = function () {
        if (this.loginService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            alert("You need to be logged in to view this resource");
            return false;
        }
    };
    return AuthGuardModule;
}());
AuthGuardModule = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [login_service_1.LoginService, router_1.Router])
], AuthGuardModule);
exports.AuthGuardModule = AuthGuardModule;
//# sourceMappingURL=auth-guard.module.js.map