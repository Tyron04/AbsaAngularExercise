import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../../models/user/user';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { serverConfig } from '../../config/server.config';

import 'rxjs/add/operator/map'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private usersUrl = `${serverConfig.protocol}://${serverConfig.hostname}:${serverConfig.port}/api/users`;
    private headers = new Headers({ "Authorization": "Bearer " + localStorage.getItem('id_token') });
    constructor(private http: Http) { }

    getUsers(): Observable<User[]> {
        console.log(this.usersUrl);
        return this.http.get(this.usersUrl, { headers: this.headers })
            .map(response => response.json() as User[]);
    };

    getUser(id: number): Observable<User> {
        var url = `${this.usersUrl}/${id}`;
        return this.http.get(url, { headers: this.headers })
            .map(response => response.json() as User);
    };

    create(user: User): Observable<User> {
        return this.http.post(this.usersUrl, user, { headers: this.headers })
            .map(response => response.json() as User);
    };

    update(user: User): Observable<User> {
        var url = `${this.usersUrl}/${user.Id}`;
        return this.http.put(url, user, { headers: this.headers })
            .map(response => response.json() as User);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while performing user operations', error);
        return Promise.reject(error.message || error);
    };
}