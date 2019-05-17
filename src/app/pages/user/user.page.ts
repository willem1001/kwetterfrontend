import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'user.page.html'
})

export class UserPage {
  currentUser;
  addUserPage;
  user;
  following = [];
  followers = [];
  timeline;
  activeId = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) {

    route.queryParams.subscribe(params => {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      this.getUser(params["id"]);
    });
    this.addUserPage = new FormGroup({});
  }

  getUser(id) {
    console.log("get " + id);
    this.http.get('http://localhost:8080/oioi_war/api/user/' + id).subscribe(response => {
      this.user = response;
      this.getTimeLine();
      this.getFollow();
    });
  }

  getTimeLine() {
    this.http.get('http://localhost:8080/oioi_war/api/post/getTimeLine/' + this.user["id"]).subscribe(response => {
      const timelineArray = [];
      Object.values(response).forEach(function (post) {
        timelineArray.push(JSON.parse(post));
      });
      this.timeline = timelineArray;
    });
  }

  getFollow() {
    this.http.get('http://localhost:8080/oioi_war/api/user/getAllFollowers/' + this.user["id"]).subscribe(response =>{
      const followerArray = [];
      Object.values(response).forEach(function (following) {
        followerArray.push(following);
      });
      this.followers = followerArray;
    });


    this.http.get('http://localhost:8080/oioi_war/api/user/getAllFollowing/' + this.user["id"]).subscribe(response =>{
      const followingArray = [];
      Object.values(response).forEach(function (following) {
        followingArray.push(following);
      });
      this.following = followingArray;
    });
  }
}


