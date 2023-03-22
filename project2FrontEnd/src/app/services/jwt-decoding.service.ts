import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtDecodingService {
  token = localStorage.getItem('jwt')

  constructor() { }
  //Gets Id number from the JWT Token
  getId() : number{
    if(this.token){
      const decodedToken: any= jwt_decode(this.token);
      const Id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber'];
      return Id;
    }  
    else{
      return 0;
    }
  }
    //Gets Username from the JWT Token
    getUsername() : string{
      if(this.token){
        const decodedToken: any= jwt_decode(this.token);
        const Username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        return Username;
      }  
      else{
        return " ";
      }
    }
      //Gets Access Level from the JWT Token
    getAccessLevel() : number{
      if(this.token){
        const decodedToken: any= jwt_decode(this.token);
        const AccessLevel = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        return AccessLevel;
      }  
      else{
        return 0;
      }
    }
  }

