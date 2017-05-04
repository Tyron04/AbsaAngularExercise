import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';
import '../styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to the Absa Portal';
  constructor(private loginService: LoginService) {
    this.loginService.handleAuthentication();
  }
}
