import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'home.page.html'
})

export class HomePage {
  user;
  timeline;
  addHomePageForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient) {

    this.user = JSON.parse(localStorage.getItem("user"));
    if (!this.user) {
      router.navigateByUrl('/login')
    }

    this.addHomePageForm = new FormGroup({
      tweetContent: new FormControl(),
      commentContent: new FormControl(),
    });

    this.getTimeLine();
  }

  logOut() {
    this.http.post('http://localhost:8080/oioi_war/api/user/logout', {"id": this.user["id"]}).subscribe(response => {
      localStorage.removeItem("user");
      this.router.navigateByUrl("/login");
    });

  }

  getTimeLine() {
    this.http.get('http://localhost:8080/oioi_war/api/post/getTimeLine/' + this.user["id"]).subscribe(response => {
      this.timeline = response;
    })
  }

  createTweet() {
    let content = this.addHomePageForm.get("tweetContent").value;
    let id = this.user["id"];
    this.http.post('http://localhost:8080/oioi_war/api/post/createTweet', {
      "content": content,
      "id": id
    }).subscribe(response => {
      this.getTimeLine();
    })
  }

  postComment(post) {
    let content = this.addHomePageForm.get("commentContent").value;
    let id = this.user["id"];
    this.http.post('http://localhost:8080/oioi_war/api/post/createComment', {
      "parentId": post["id"],
      "id": id,
      "content": content
    }).subscribe(response => {
      this.getTimeLine();
      alert(response["postType"]);
    })
  }
}
