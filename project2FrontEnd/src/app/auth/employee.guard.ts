import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(private router:Router, private jwtHelper: JwtHelperService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token: string | null = localStorage.getItem('jwt');
      if (token){
        const decodedToken: any= jwt_decode(token);
        console.log(decodedToken);
        const Id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (Id > 0){
          return true;
        } else{
          this.router.navigate(['/ViewTickets'])
          return false
        }

      }
      this.router.navigate(['/Login'])
    return false;
  }
  
}
