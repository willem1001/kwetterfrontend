import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'register.page.html'
})

export class RegisterPage {
  addRegisterForm: FormGroup;

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
    this.http.post('http://localhost:8080/oioi_war/api/user/create', this.addRegisterForm.value).subscribe();
    this.router.navigateByUrl('/home');

  }
}
