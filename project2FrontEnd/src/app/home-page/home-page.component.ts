import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtDecodingService } from '../services/jwt-decoding.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private jwtHelper: JwtHelperService) { }
  ngOnInit(): void {
    
  }
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }
  logOut = () => {
    localStorage.removeItem("jwt");
  }
}
