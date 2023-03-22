import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { JwtDecodingService } from '../services/jwt-decoding.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  token: string | null = localStorage.getItem('jwt');
  constructor(public router: Router, private jwtHelper: JwtDecodingService) { }
  //Determines if the employee is above access level 0, and navigates them to the page associated with their access levels
  canActivate(
    route: ActivatedRouteSnapshot | null,
    state: RouterStateSnapshot | null): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.token) {
      const Id = this.jwtHelper.getAccessLevel()
      if (Id > 0) {
        return true;
      } else {
        this.router.navigate(['/ViewTickets'])
        return false
      }

    }
    this.router.navigate(['/Login'])
    return false;
  }

}
