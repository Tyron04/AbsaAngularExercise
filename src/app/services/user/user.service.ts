import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../../models/user/user';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private usersUrl = 'http://localhost:57022/api/users';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getUsers(): Promise<User[]> {
        return this.http.get(this.usersUrl)
        .toPromise()
        .then(response=>response.json() as User[])
        .catch(this.handleError);
    };

    getUser(id:number):Promise<User>{
        var url = `${this.usersUrl}/${id}`;
       return this.http.get(url)
        .toPromise()
        .then(response=>response.json() as User)
        .catch(this.handleError);  
    };

    create(user: User): Promise<User> {
       return this.http.post(this.usersUrl, user)
        .toPromise()
        .then(response=>response.json() as User)
        .catch(this.handleError);  
    };

    update(user: User): Promise<User> {
         var url = `${this.usersUrl}/${user.Id}`;
         return this.http.put(url, user)
        .toPromise()
        .then(response=>response.json() as User)
        .catch(this.handleError);  
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred while performing user operations', error);
        return Promise.reject(error.message || error);
    };
}