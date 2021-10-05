import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent,HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  urlsToNotUse: Array<string>

  constructor() {
    this.urlsToNotUse= [
      'v0.1/countries/states/.+',
      'v0.1/countries/flag/images',
    ];
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwtToken = localStorage.getItem('token');

    if(jwtToken && this.isValidRequestForInterceptor(req.url)) {  //if token exists I'll attach it to the header of the request
      const reqWithJwtAttached = req.clone({
        headers: req.headers.set('Authorization', jwtToken)
      });
      return next.handle(reqWithJwtAttached);
    } else { //if token doesn't exist I'll send the request as it is
      return next.handle(req);
    }

  }

  private isValidRequestForInterceptor(reqUrl: string): boolean {
    let positionIndicator: string = 'api/';
    let position = reqUrl.indexOf(positionIndicator);
    if (position > 0) {
      let destination: string = reqUrl.substr(position + positionIndicator.length);
      for (let address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }

}