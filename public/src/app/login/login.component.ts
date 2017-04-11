import { Component } from '@angular/core';
import { LoginDetails } from '../models/loginDetails/login-details';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService],
})

export class LoginComponent {
    title = "Welcome to the Absa Exercise Portal";
    constructor(private loginService: LoginService,
        private router: Router,
        private formBuilder: FormBuilder) { }

    loginForm = this.formBuilder.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
    })

    login(): void {
        this.loginService.login(this.loginForm.value as LoginDetails);
    };

}