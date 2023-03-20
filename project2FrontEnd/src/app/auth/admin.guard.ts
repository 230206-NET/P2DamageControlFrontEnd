import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { JwtDecodingService } from '../services/jwt-decoding.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router:Router, private jwtHelper: JwtHelperService, private jwtDecoder: JwtDecodingService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token: string | null = localStorage.getItem('jwt');
      if (token){
        let AccessLevel : number = this.jwtDecoder.getId()
        if (AccessLevel > 2){
          return true;
        } else{
          this.router.navigate(['/notAuthorized'])
          return false
        }

      }
      this.router.navigate(['/Login'])
    return false;
  }
  
}
