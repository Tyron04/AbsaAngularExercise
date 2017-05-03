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
var user_service_1 = require("../services/user/user.service");
var forms_1 = require("@angular/forms");
var country_service_1 = require("../services/country/country.service");
require("rxjs/add/operator/switchMap");
var EditScreenComponent = (function () {
    function EditScreenComponent(userService, route, router, formBuilder, countryService) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.countryService = countryService;
        this.editForm = this.formBuilder.group({
            Name: ['', forms_1.Validators.required],
            Surname: ['', forms_1.Validators.required],
            Country: ['', forms_1.Validators.required]
        });
    }
    EditScreenComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCountries();
        this.route.params
            .switchMap(function (params) { return _this.userService.getUser(+params['id']); })
            .subscribe(function (user) {
            _this.user = user;
            _this.editForm.setValue({
                Name: _this.user.Name,
                Surname: _this.user.Surname,
                Country: _this.user.Country
            });
        }, function (error) { return console.log(error); });
    };
    ;
    EditScreenComponent.prototype.getCountries = function () {
        var _this = this;
        this.countryService.getCountries()
            .subscribe(function (countries) { return _this.countries = countries; }, function (error) { return console.log(error); });
    };
    EditScreenComponent.prototype.update = function () {
        var _this = this;
        var updatedUser = this.editForm.value;
        updatedUser._id = this.user._id;
        this.userService.update(updatedUser)
            .subscribe(function () {
            _this.router.navigate(['/users']);
        }, function (error) { return console.log(error); });
    };
    ;
    EditScreenComponent.prototype.cancel = function () {
        this.router.navigate(['/users']);
    };
    return EditScreenComponent;
}());
EditScreenComponent = __decorate([
    core_1.Component({
        selector: 'edit-user',
        templateUrl: './edit-screen.component.html',
        styleUrls: ['./edit-screen.component.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router,
        forms_1.FormBuilder,
        country_service_1.CountryService])
], EditScreenComponent);
exports.EditScreenComponent = EditScreenComponent;
//# sourceMappingURL=edit-screen.component.js.map