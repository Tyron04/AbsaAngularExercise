"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_module_1 = require("./auth-guard.module");
var login_component_1 = require("../login/login.component");
var create_screen_component_1 = require("../createUser/create-screen.component");
var view_screen_component_1 = require("../viewUser/view-screen.component");
var edit_screen_component_1 = require("../editUser/edit-screen.component");
var fun_parent_component_1 = require("../fun/fun-parent.component");
var routes = [
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'create',
        component: create_screen_component_1.CreateScreenComponent,
        canActivate: [auth_guard_module_1.AuthGuardModule]
    },
    {
        path: 'users',
        component: view_screen_component_1.ViewScreenComponent,
        canActivate: [auth_guard_module_1.AuthGuardModule]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'edit/:id',
        component: edit_screen_component_1.EditScreenComponent,
        canActivate: [auth_guard_module_1.AuthGuardModule]
    },
    {
        path: 'fun',
        component: fun_parent_component_1.FunParentComponent,
        canActivate: [auth_guard_module_1.AuthGuardModule]
    },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map