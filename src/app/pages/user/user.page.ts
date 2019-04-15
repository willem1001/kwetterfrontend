import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: 'user.page.html'
})

export class UserPage {
  userId;
  userName;
  userBio;
  userRole;
  userLocation;
  userWebsite;
  userFollowers = [];

  currentUser;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) {
    route.queryParams.subscribe(params => {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.getUser(params["id"])
    })
  }

  getUser(id) {
    this.http.get('http://localhost:8080/oioi_war/api/user/' + id).subscribe(response => {
      this.userId = response['id'];
      this.userName = response['userName'];
      this.userBio = response['userBio'];
      this.userRole = response['userRole'];
      this.userLocation = response['location'];
      this.userWebsite = response['website'];
      this.userFollowers = response['followers'];
    })
  }

  followUser() {
    this.http.post('http://localhost:8080/oioi_war/api/user/follow', {
      'followingId': this.userId,
      'followerId': this.currentUser['id']
    }).subscribe(() => {
    })
  }
}


