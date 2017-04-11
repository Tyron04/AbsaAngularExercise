import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardModule } from './routing/auth-guard.module';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { UserService } from './services/user/user.service';
import { CountryService } from './services/country/country.service';
import { LoginService } from './services/login/login.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateScreenComponent } from './createUser/create-screen.component';
import { EditScreenComponent } from './editUser/edit-screen.component';
import { ViewScreenComponent } from './viewUser/view-screen.component';
import { FunParentComponent } from './fun/fun-parent.component';
import { FunButtonComponent } from './fun/fun-button.component';

@NgModule({
  imports: [BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule],

  declarations: [AppComponent,
    LoginComponent,
    CreateScreenComponent,
    EditScreenComponent,
    ViewScreenComponent,
    FunButtonComponent,
    FunParentComponent
  ],

  bootstrap: [AppComponent],

  providers: [CountryService,
    UserService,
    AUTH_PROVIDERS,
    LoginService,
    AuthGuardModule,
  ]
})
export class AppModule { }
