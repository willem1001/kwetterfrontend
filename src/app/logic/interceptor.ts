import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from "rxjs";

export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = "";
    let id = "";
    if (user) {
      token = user["token"];
      id = user["id"];
    }

    const clonedRequest = req.clone({headers: req.headers.set('Authorization', token).set("AuthorizationId", id)});
    return next.handle(clonedRequest);
  }
}
