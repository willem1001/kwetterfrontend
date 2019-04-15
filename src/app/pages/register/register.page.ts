import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Component} from "@angular/core";
import * as crypto from "crypto-js"

@Component({
  templateUrl: 'register.page.html'
})

export class RegisterPage {
  addRegisterForm: FormGroup;
  userName;

  constructor(
    private router: Router,
    private http: HttpClient) {
    this.addRegisterForm = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
      bio: new FormControl(),
      location: new FormControl(),
      website: new FormControl(),
      profilePicture: new FormControl()
    });
  }

  addUser() {
    let formValue = this.addRegisterForm.value;
    let hash = crypto.SHA512(formValue.password);
    formValue.password = hash.toString();

    this.http.post('http://localhost:8080/oioi_war/api/user/create', formValue).subscribe();
    this.router.navigateByUrl('/login');
  }
}
