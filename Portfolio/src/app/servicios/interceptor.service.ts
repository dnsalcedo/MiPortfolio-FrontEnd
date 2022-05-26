import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if (request.method != 'GET' && request.url != 'https://heroku-miportfolio-dsalcedo.herokuapp.com/api/login' && request.url != 'http://localhost:8080/api/login') {
      const token = this.tokenService.getToken();
      if (token != null) {
        req = req.clone({
          headers: req.headers.set('Authorization', token)
        });
      }
    }
    return next.handle(req);
  }
}
