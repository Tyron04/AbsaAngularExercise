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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var countries_mock_1 = require("./countries-mock");
require("rxjs/add/operator/toPromise");
var CountryService = (function () {
    function CountryService(http) {
        this.http = http;
        this.countriesUrl = 'api/countries';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    CountryService.prototype.getCountries = function () {
        //TODO: Get Countries from Api using http
        return Promise.resolve(countries_mock_1.COUNTRIES);
    };
    ;
    return CountryService;
}());
CountryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CountryService);
exports.CountryService = CountryService;
//# sourceMappingURL=country.service.js.map