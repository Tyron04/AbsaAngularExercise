import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../../models/user/user';
import { Observable } from 'rxjs';
import { AuthHttp } from 'angular2-jwt';
import { serverConfig } from '../../config/server.config';

import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private usersUrl = `${serverConfig.protocol}://${serverConfig.hostname}:${serverConfig.port}/api/users`;
    //private headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('id_token') });
    constructor(private http: AuthHttp) { }

    getUsers(): Observable<User[]> {
        return this.http.get(this.usersUrl)
            .map(response => response.json() as User[]);
    };

    getUser(id: number): Observable<User> {
        let url = `${this.usersUrl}/${id}`;
        return this.http.get(url)
            .map(response => response.json() as User);
    };

    create(user: User): Observable<User> {
        return this.http.post(this.usersUrl, user)
            .map(response => response.json() as User);
    };

    update(user: User): Observable<User> {
        let url = `${this.usersUrl}/${user._id}`;
        return this.http.put(url, user)
            .map(response => response.json() as User);
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while performing user operations', error);
        return Promise.reject(error.message || error);
    };
}
