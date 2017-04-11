import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AuthGuardModule implements CanActivate {

    constructor(private loginService: LoginService, private router:Router) { }

    canActivate() {
        if( this.loginService.isAuthenticated()){
            return true;
        }
        else{
            this.router.navigate(['/login']);
            alert("You need to be logged in to view this resource");
            return false;
        }
    }
}