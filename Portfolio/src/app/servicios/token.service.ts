import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const ID = '';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public setUserID(id: string): void {
    window.localStorage.removeItem(ID);
    window.localStorage.setItem(ID, id);
  }

  public getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    } else {
      return '';
    }
  }

  public getUserID(): string {
    const usuario_id = localStorage.getItem(ID);
    if (usuario_id) {
      return usuario_id;
    } else {
      return '';
    }
  }

  public getUserName(): string {
    const usuario_id = localStorage.getItem(ID);
    if (usuario_id) {
      const token = this.getToken();
      const payload = token?.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      const username = values.sub;
      return username;
    } else {
      return '';
    }
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/portfolio']);
  }

  public logOutError(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }


}
