import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/servicios/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private tokenService: TokenService, private rutas: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.tokenService.getToken()) {
      return true;
    } else {
      this.rutas.navigate(['/login'])
      return false;
    }

  }
}
