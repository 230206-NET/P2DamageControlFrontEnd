import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor() { }
  //Checks to see if the user is logged in
isAuthenticated(){
    return this.isLoggedIn;
  }
}