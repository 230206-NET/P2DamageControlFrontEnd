import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class JwtDecodingService {

  constructor() { }
  getId() : number{
    const token: string | null = localStorage.getItem('jwt');
    if(token){
      const decodedToken: any= jwt_decode(token);
      console.log(decodedToken);
      const Id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber'];
      return Id;
    }  
    else{
      return 0;
    }
  }
    getUsername() : string{
      const token: string | null = localStorage.getItem('jwt');
      if(token){
        const decodedToken: any= jwt_decode(token);
        console.log(decodedToken);
        const Username = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/name'];
        return Username;
      }  
      else{
        return " ";
      }
    }
    getAccessLevel() : number{
      const token: string | null = localStorage.getItem('jwt');
      if(token){
        const decodedToken: any= jwt_decode(token);
        console.log(decodedToken);
        const AccessLevel = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        return AccessLevel;
      }  
      else{
        return 0;
      }
    }
  }

