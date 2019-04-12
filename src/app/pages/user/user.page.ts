import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: 'user.page.html'
})

export class UserPage {
  userId;
  constructor(route: ActivatedRoute) {
      route.queryParams.subscribe(params => {
      this.userId = params["id"];
    })
  }
}
