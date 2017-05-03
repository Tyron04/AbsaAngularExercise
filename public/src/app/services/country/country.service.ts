import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Country } from '../../models/country/country';
import { Observable } from 'rxjs';
import { serverConfig } from '../../config/server.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CountryService {
    private countriesUrl = `${serverConfig.protocol}://${serverConfig.hostname}:${serverConfig.port}/api/countries`;
    constructor(private http: Http) { }

    getCountries(): Observable<Country[]> {
        return this.http.get(this.countriesUrl)
            .map(response => response.json() as Country[]);
    };
}
