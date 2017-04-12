import { Injectable } from '@angular/core';
import { LoginDetails } from '../../models/loginDetails/login-details';
import { Router, NavigationStart } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig } from '../../config/auth.config';
import { serverConfig } from '../../config/server.config';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    private authUrl = `${serverConfig.protocol}://${serverConfig.hostname}:${serverConfig.port}/api/auth`;
    constructor(private router: Router,
        private http: Http) {
    }

    public handleAuthentication(): void {
        if (!this.isAuthenticated()) {
            this.router.navigate(['/login']);
        }
        else {
            this.router.navigate(['/create']);
        }
    }

    public login(loginDetails: LoginDetails): void {
        var username: string = loginDetails.username;
        var password: string = loginDetails.password;
        var loginUrl = `${this.authUrl}/login`;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        var encoded = btoa(username + ":" + password);
        headers.append("Authorization", "Basic " + encoded);
        this.http.post(loginUrl, { body: "" }, { headers: headers })
            .toPromise().catch(this.handleError)
            .then(response => {
                if (response.ok) {
                    localStorage.setItem('id_token', response.json());
                    this.router.navigate(['/create']);
                }
                else {
                    return alert("Invalid username/password");
                }
            });
    }

    public isAuthenticated(): boolean {
        var tokenEncoded = localStorage.getItem('id_token');
        if (tokenEncoded !== null) {
            var tokenDecoded = atob(tokenEncoded);
            var tokenInfo = tokenDecoded.split('|');
            if (tokenInfo.length > 2) {
                var username = tokenInfo[0];
                var authToken = tokenInfo[1];
                var tokenExpiry = tokenInfo[2];
                if (username !== "" && authToken !== "") {
                    var tokenExpiryDate = new Date(tokenExpiry);
                    var now = new Date();
                    var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                    if (tokenExpiryDate > now_utc) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    public logout(): void {
        localStorage.removeItem('id_token');
        this.router.navigate(['/login']);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while performing user operations', error);
        return Promise.reject(error.message || error);
    };
}