import {Routes} from "@angular/router";
import {HomePage} from "./pages/home/home.page";
import {RegisterPage} from "./pages/register/register.page";
import {LoginPage} from "./pages/login/login.page";
import {UserPage} from "./pages/user/user.page";

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'user',
    component: UserPage
  },
  {
    path: '*',
    redirectTo: '/login'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
