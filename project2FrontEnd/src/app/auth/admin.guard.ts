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


  constructor(public router: Router, private jwtHelper: JwtHelperService, private jwtDecoder: JwtDecodingService) { }
  //Ensures the user has an access level of at least 3, aand navigates them to the appropriate page
  token: string | null = localStorage.getItem('jwt');
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.token) {
      let AccessLevel: number = this.jwtDecoder.getAccessLevel()
      if (AccessLevel > 2) {
        return true;
      }
      this.router.navigate(['/notAuthorized'])
      return false
    } else {
      this.router.navigate(['/Login'])
      return false;
    }
  }
}
