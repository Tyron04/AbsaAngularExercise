"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./routing/app-routing.module");
var forms_2 = require("@angular/forms");
var user_service_1 = require("./services/user/user.service");
var country_service_1 = require("./services/country/country.service");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var create_screen_component_1 = require("./createUser/create-screen.component");
var edit_screen_component_1 = require("./editUser/edit-screen.component");
var view_screen_component_1 = require("./viewUser/view-screen.component");
var fun_parent_component_1 = require("./fun/fun-parent.component");
var fun_button_component_1 = require("./fun/fun-button.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule,
            forms_2.ReactiveFormsModule],
        declarations: [app_component_1.AppComponent,
            login_component_1.LoginComponent,
            create_screen_component_1.CreateScreenComponent,
            edit_screen_component_1.EditScreenComponent,
            view_screen_component_1.ViewScreenComponent,
            fun_button_component_1.FunButtonComponent,
            fun_parent_component_1.FunParentComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [country_service_1.CountryService, user_service_1.UserService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map