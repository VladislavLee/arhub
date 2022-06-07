import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class fwcAPIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authReq = req.clone({
      headers: new HttpHeaders({
        UserId: window.localStorage.getItem('login')!!
      })
    });

    console.log('Intercepted HTTP call', authReq);

    return next.handle(authReq);
  }
}
