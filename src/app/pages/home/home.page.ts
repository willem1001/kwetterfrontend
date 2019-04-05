import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'home.page.html'
})

export class HomePage {
  user = localStorage.getItem("user");

  constructor(
    private router: Router,
    private http: HttpClient) {

    let user = JSON.parse(localStorage.getItem("user"));
    if(!user) {
        router.navigateByUrl('/login')
    }
  }

  logOut(){
    localStorage.removeItem("user");
    this.router.navigateByUrl("/login");
  }

  getTimeLine() {
    this.http.post('http://localhost:8080/oioi_war/api/user/create', this.user["id"]).subscribe(response => {

    } )
  }
}
