import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SESSION_API } from 'config/http.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  accessToken: string = localStorage.getItem("accessToken");
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: this.accessToken
        }
      })
      return next.handle(modifiedRequest)
  }


}

