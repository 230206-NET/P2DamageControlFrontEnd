import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackEndAPIService {

  constructor(private http: HttpClient) {
  }
  getSpecifiedUser() : Observable<any> {
    return this.http.get('http://localhost:5025/LogIn');
  }
}
