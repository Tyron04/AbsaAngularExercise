import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Country } from '../../models/country/country';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { serverConfig } from '../../config/server.config';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CountryService {
    private countriesUrl = `${serverConfig.protocol}://${serverConfig.hostname}:${serverConfig.port}/api/countries`;
    constructor(private http: Http) { }

    getCountries(): Observable<Country[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append("Authorization", "Bearer " + localStorage.getItem('id_token'));
        return this.http.get(this.countriesUrl)
            .map(response => response.json() as Country[]);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while performing country operations', error);
        return Promise.reject(error.message || error);
    }
}