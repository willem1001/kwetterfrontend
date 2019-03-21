import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: 'home.page.html'
})

export class HomePage {
  users;

  constructor(
    private http: HttpClient) {
    this.http.get('http://localhost:8080/oioi_war/api/user').subscribe(user => {
      this.users = user;
    })
  }
}
