import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {Component} from "@angular/core";


export var loggedUser;

@Component({
  templateUrl: 'login.page.html'
})

export class LoginPage {

  addLoginForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient) {

    this.addLoginForm = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
    });

  }

  login() {
    this.http.post('http://localhost:8080/oioi_war/api/user/login', this.addLoginForm.value).subscribe(user => loggedUser = user);
  }
}
