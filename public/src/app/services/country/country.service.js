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
var server_config_1 = require("../../config/server.config");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var CountryService = (function () {
    function CountryService(http) {
        this.http = http;
        this.countriesUrl = server_config_1.serverConfig.protocol + "://" + server_config_1.serverConfig.hostname + ":" + server_config_1.serverConfig.port + "/api/countries";
    }
    CountryService.prototype.getCountries = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Bearer " + localStorage.getItem('id_token'));
        return this.http.get(this.countriesUrl, { headers: headers })
            .map(function (response) { return response.json(); });
    };
    ;
    CountryService.prototype.handleError = function (error) {
        console.error('An error occurred while performing country operations', error);
        return Promise.reject(error.message || error);
    };
    return CountryService;
}());
CountryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CountryService);
exports.CountryService = CountryService;
//# sourceMappingURL=country.service.js.map