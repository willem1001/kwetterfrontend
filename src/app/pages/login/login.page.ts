import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {Component} from "@angular/core";
import * as crypto from "crypto-js"
import {AppComponent} from "../../app.component";
import {resolve} from "q";

@Component({
  templateUrl: 'login.page.html'
})

export class LoginPage {
  addLoginForm: FormGroup;
  captcha: String;

  constructor(
    private router: Router,
    private app: AppComponent,
    private http: HttpClient) {

    this.addLoginForm = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
    });

    if(localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      this.repeatLogin(user["userName"], user["password"]);
    }
  }

  login() {
    let values = this.addLoginForm.value;
    let hash = crypto.SHA512(values.password);
    values.password = hash.toString();
    values.recaptcha = this.captcha;

    this.http.post('http://localhost:8080/oioi_war/api/user/login', values).subscribe(response => {
      this.app.setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      this.router.navigateByUrl("/home");
    });
  }

  repeatLogin(userName, password) {
    this.http.post('http://localhost:8080/oioi_war/api/user/login', {"userName" : userName, "password" : password}).subscribe(response => {
      this.app.setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      this.router.navigateByUrl("/home");
    });
  }

  resolved(captchaResponse: string) {
      this.captcha = captchaResponse;
  }
}
