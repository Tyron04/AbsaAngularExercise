import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Country } from '../../models/country/country';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CountryService {
    private countriesUrl = 'http://localhost:57022/api/countries';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getCountries(): Promise<Country[]> {
        return this.http.get(this.countriesUrl)
            .toPromise()
            .then(response => response.json() as Country[])
            .catch(this.handleError);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while performing country operations', error);
        return Promise.reject(error.message || error);
    }
}