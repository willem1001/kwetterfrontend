import {Component} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


@Component({
  templateUrl: 'register.page.html'
})

export class RegisterPage {
  addRegisterForm: FormGroup;


  constructor(
    private router: Router,
    private http: HttpClient) {
    this.addRegisterForm = new FormGroup({
      userName: new FormControl(undefined),
      password: new FormControl(undefined),
      bio: new FormControl(undefined),
      location: new FormControl(undefined),
      website: new FormControl(undefined),
      profilePicture: new FormControl(undefined)
    });
  }

  addUser() {
    this.http.post('http://localhost:8080/oioi_war/api/user/create', this.addRegisterForm.value).subscribe();
    this.router.navigateByUrl('/home');

  }
}
