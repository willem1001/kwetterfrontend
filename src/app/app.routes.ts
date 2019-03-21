import {Routes} from "@angular/router";
import {HomePage} from "./pages/home/home.page";
import {RegisterPage} from "./pages/Register/register.page";

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
    path: '*',
    redirectTo: '/home'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
