import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {SocketWrap} from "../../logic/socketwrap";
import {PushNotificationsService} from "../../logic/notificationservice";

@Component({
  templateUrl: 'home.page.html',
  selector: 'push-notification',
  providers: [PushNotificationsService]
})

export class HomePage implements OnInit{
  socket;
  user;
  addHomePageForm: FormGroup;
  timeline;
  activeId = [];
  isSearching = false;
  searchResults;
  following = [];
  followers = [];

  constructor(
    private notificationService: PushNotificationsService,
    private router: Router,
    private socketWrap: SocketWrap,
    private http: HttpClient) {

    this.user = JSON.parse(localStorage.getItem("user"));
    if (!this.user) {
      router.navigateByUrl('/login')
    }

    this.addHomePageForm = new FormGroup({
      tweetContent: new FormControl(),
      commentContent: new FormControl(),
      searchUser: new FormControl(),
    });

    this.socket = this.socketWrap.open('ws://localhost:3001/tweets');
    this.socket.states.subscribe(state => {
    });
    this.socket.tweets.subscribe(tweet => {
      console.log(tweet);
      this.getTimeLine()
    });

    this.notify();
  }

  ngOnInit(): void {
    this.getTimeLine();
    this.getFollow();
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
    this.http.get('http://localhost:8080/oioi_war/api/user/getAllFollowers/' + this.user["id"]).subscribe(followerResponse => {
      const followerArray = [];
      Object.values(followerResponse).forEach(function (following) {
        followerArray.push(following);
      });
      this.followers = followerArray;
    });


    this.http.get('http://localhost:8080/oioi_war/api/user/getAllFollowing/' + this.user["id"]).subscribe(followingResponse => {
      const followingArray = [];
      Object.values(followingResponse).forEach(function (following) {
        followingArray.push(following);
      });
      this.following = followingArray;
    });
  }

  createTweet() {
    let content = this.addHomePageForm.get("tweetContent").value;
    let id = this.user["id"];
    this.http.post('http://localhost:8080/oioi_war/api/post/createTweet', {
      "content": content,
      "id": id
    }).subscribe(() => {
      this.socket.send('newTweet');
    })
  }

  postComment(post) {
    let content = this.addHomePageForm.get("commentContent").value;
    let id = this.user["id"];
    this.http.post('http://localhost:8080/oioi_war/api/post/createComment', {
      "parentId": post["tweetId"],
      "id": id,
      "content": content
    }).subscribe(() => {
      this.socket.send('newComment');
    })
  }

  openAccordion(id) {
    if (this.activeId[0] === id) {
      this.activeId = [];
    } else {
      this.activeId[0] = id;
    }
  }

  openUserPage(id) {
    if (this.user['id'] != id) {
      this.router.navigate(['/user'], {queryParams: {"id": id}});
    } else {
      this.router.navigateByUrl("/home");
    }
  }

  searchUsers() {
    const query = this.addHomePageForm.get("searchUser").value;
    this.http.get('http://localhost:8080/oioi_war/api/user/searchUsers/' + query).subscribe(response => {
      this.searchResults = response;
      this.isSearching = true;
    });
  }

  returnFromUserSearch() {
    this.isSearching = false;
    this.searchResults = undefined;
  }

  gotoWebsite() {
    window.location.href = this.user['website'];
  }

  followUser(id) {
    this.http.post("http://localhost:8080/oioi_war/api/user/follow", {
      "followingId": id,
      "followerId": this.user['id']
    }).subscribe(() => {
      this.getFollow()
    })
  }
  notify() {
    let data: Array < any >= [];
    data.push({
      "title": "Welcome",
      "alertContent": "Hello " + this.user["userName"]
    });
    this.notificationService.generateNotification(data);
  }
}
