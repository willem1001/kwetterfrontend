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
    if(localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.user = undefined;
    }
    this.addAppComponent = new FormGroup({
      search : new FormControl(),
    })
  }
  logOut() {

    const id = this.user["id"];
    this.http.post('http://localhost:8080/oioi_war/api/user/logout', {"id": id}).subscribe(() => {
      this.router.navigateByUrl("/login");
    });
    this.user = undefined;
    localStorage.clear();
  }

  setUser(user) {
    this.user = user;
  }
}


