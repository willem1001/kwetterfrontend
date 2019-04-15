import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {Component} from "@angular/core";
import * as crypto from "crypto-js"
import {AppComponent} from "../../app.component";

@Component({
  templateUrl: 'login.page.html'
})

export class LoginPage {
  addLoginForm: FormGroup;

  constructor(
    private router: Router,
    private app: AppComponent,
    private http: HttpClient) {

    this.addLoginForm = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    let values = this.addLoginForm.value;
    let hash = crypto.SHA512(values.password);
    values.password = hash.toString();

    this.http.post('http://localhost:8080/oioi_war/api/user/login', values).subscribe(response => {
      this.app.setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      this.router.navigateByUrl("/home");
    });
  }

}
