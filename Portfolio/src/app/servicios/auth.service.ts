import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://heroku-miportfolio-dsalcedo.herokuapp.com/api/login';
  //url = 'http://localhost:8080/api/login';
  token: string = '';
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
  }

  login(credenciales: any): Observable<any> {
    var header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('user', credenciales.user);
    urlSearchParams.append('password', credenciales.password);
    let body = urlSearchParams.toString()
    return this.http.post(this.url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      responseType: "json"
    }).pipe(map(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))

  };

  chequearLogin() {
    return this.http.post(this.url + `/estado`, 'body', {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      responseType: "text"
    }).pipe(map(data => {
      return (data.toString);
    }))

  }

}
