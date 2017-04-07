import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../../models/loginDetails/login-details';

import 'rxjs/add/operator/toPromise';

export class LoginService {
    login(loginDetails: LoginDetails): Promise<boolean> {
        if (loginDetails.username.toLowerCase() === "tyron" && loginDetails.password === "12345") {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    };

}