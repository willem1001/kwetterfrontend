import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ActivationPage} from "./pages/activation/activation.page";
import { HomePage } from './pages/home/home.page';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RegisterPage} from './pages/register/register.page';
import {LoginPage} from "./pages/login/login.page";
import {AddHeaderInterceptor} from "./logic/interceptor";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {UserPage} from "./pages/user/user.page";
import {SocketWrap} from "./logic/socketwrap";

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    RegisterPage,
    LoginPage,
    UserPage,
    ActivationPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeaderInterceptor,
    multi: true,
  },
  SocketWrap],
  bootstrap: [AppComponent]
})
export class AppModule { }
