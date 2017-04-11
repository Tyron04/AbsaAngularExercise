import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from './services/login/login.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to the Absa Portal';
  constructor(private loginService:LoginService){
    this.loginService.handleAuthentication();
  }
}
