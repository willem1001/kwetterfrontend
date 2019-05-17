import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: 'activation.page.html',
})

export class ActivationPage implements OnInit {

  addActivationForm;
  isActivated: boolean;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.addActivationForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.http.post('http://localhost:8080/oioi_war/api/user/activate', {"activationToken": params['activationToken']}).subscribe(response => {
        if(response === "ACCEPTED") {
          this.isActivated = true
        } else  {
          this.isActivated = false;
        }
      })
    })
  }
}
