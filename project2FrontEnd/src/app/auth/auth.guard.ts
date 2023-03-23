import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) { }
  //Determines if the user has a valid token, and if not, navigates them to the login screen
  token = localStorage.getItem("jwt");
  canActivate(route: ActivatedRouteSnapshot | null, state: RouterStateSnapshot | null) {
    if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
      return true;
    }
    this.router.navigate(["/Login"]);
    return false;
  }
}