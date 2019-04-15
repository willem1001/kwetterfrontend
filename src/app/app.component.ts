import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  user;
  addAppComponent: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.addAppComponent = new FormGroup({
      search : new FormControl(),
    })
  }
  logOut() {
    this.http.post('http://localhost:8080/oioi_war/api/user/logout', {"id": this.user["id"]}).subscribe(() => {
      this.user = undefined;
      localStorage.removeItem("user");
      this.router.navigateByUrl("/login");
    });
  }

  setUser(user) {
    this.user = user;
  }
}


