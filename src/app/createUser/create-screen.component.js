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
var country_service_1 = require("../services/country/country.service");
var user_1 = require("../models/user/user");
var router_1 = require("@angular/router");
var user_service_1 = require("../services/user/user.service");
var forms_1 = require("@angular/forms");
var CreateScreenComponent = (function () {
    function CreateScreenComponent(router, countryService, userService, formBuilder) {
        this.router = router;
        this.countryService = countryService;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.createForm = this.formBuilder.group({
            name: ["", forms_1.Validators.required],
            surname: ["", forms_1.Validators.required],
            country: ["", forms_1.Validators.required]
        });
    }
    CreateScreenComponent.prototype.ngOnInit = function () {
        this.getCountries();
    };
    ;
    CreateScreenComponent.prototype.create = function () {
        var _this = this;
        this.userService.create(this.createForm.value).then(function () {
            _this.router.navigate(['/users']);
        });
    };
    ;
    CreateScreenComponent.prototype.getCountries = function () {
        var _this = this;
        this.countryService.getCountries()
            .then(function (countries) { return _this.countries = countries; })
            .catch(function (error) { return console.log(error); });
    };
    ;
    CreateScreenComponent.prototype.cancel = function () {
        this.router.navigate(['/users']);
    };
    ;
    return CreateScreenComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", user_1.User)
], CreateScreenComponent.prototype, "user", void 0);
CreateScreenComponent = __decorate([
    core_1.Component({
        selector: 'create-user',
        templateUrl: './create-screen.component.html',
        styleUrls: ['./create-screen.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        country_service_1.CountryService,
        user_service_1.UserService,
        forms_1.FormBuilder])
], CreateScreenComponent);
exports.CreateScreenComponent = CreateScreenComponent;
//# sourceMappingURL=create-screen.component.js.map