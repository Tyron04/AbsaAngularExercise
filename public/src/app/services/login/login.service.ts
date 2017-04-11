import { Injectable } from '@angular/core';
import { LoginDetails } from '../../models/loginDetails/login-details';
import { Router, NavigationStart } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig } from '../../config/auth.config';

declare var Auth0Lock: any;
declare var auth0: any;

@Injectable()
export class LoginService {
    redirectUri = 'http://localhost:3000/create';
    auth0 = new auth0.WebAuth({
        domain: myConfig.domain,
        clientID: myConfig.clientID,
        redirectUri: this.redirectUri,
        responseType: 'token id_token'
    });

    constructor(private router: Router) {
    }

    public handleAuthentication(): void {
        this.auth0.parseHash({ _idTokenVerification: false }, (err: any, authResult: any) => {
            if (err) {
                alert(`Error: ${err.errorDescription}`);
                this.router.navigate(['/login']);
            }
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                this.router.navigate(['/create']);
            }
        });
    }

    public login(loginDetails: LoginDetails): void {
        var username: string = loginDetails.username;
        var password: string = loginDetails.password;

        this.auth0.redirect.loginWithCredentials({
            connection: 'Username-Password-Authentication',
            username,
            password
        }, (err: any) => {
            if (err && err.description) {
                return alert(err.description);
            }
        });
    }

    public signup(email: string, password: string): void {
        this.auth0.redirect.signupAndLogin({
            connection: 'Username-Password-Authentication',
            email,
            password,
        }, (err: any) => {
            if (err) return alert(err.description);
        });
    };

    public isAuthenticated(): boolean {
        return tokenNotExpired();
    };

    public logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
    };

    private setUser(authResult: any): void {
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
    };

}