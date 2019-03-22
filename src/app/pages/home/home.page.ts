import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {loggedUser} from "../login/login.page";

@Component({
  templateUrl: 'home.page.html'
})

export class HomePage {
  user = loggedUser;

  constructor(
    private http: HttpClient) {

  }
}
