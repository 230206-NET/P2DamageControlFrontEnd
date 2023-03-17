import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { FormsModule, NgForm } from '@angular/forms';
import jwt_decode from 'jwt-decode';

type UserId = {
  Id: number;
}
type UserInfo = {
  username: string;
  password: string;
  fullName: string;
  email: string;
  accessLevel: number;
  id: number;
  
}

@Component({
  selector: 'app-view-profile-info',
  templateUrl: './view-profile-info.component.html',
  styleUrls: ['./view-profile-info.component.scss']
})
export class ViewProfileInfoComponent implements OnInit {
  invalidReg: boolean = false;
  info: UserId = {Id: 0}
  userInfo: UserInfo = {
    password: '',
    username: '',
    fullName: '',
    email: '',
    accessLevel: 0,
    id: 0
  }
  
  constructor(private router: Router, private http: HttpClient) { }
  async ngOnInit(): Promise<void> {
    const token: string | null = localStorage.getItem('jwt');
      if(token){
        const decodedToken: any= jwt_decode(token);
        console.log(decodedToken);
        const Id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber'];
        this.info.Id = Id;
        console.log(this.info.Id);
       
      }
      await this.getProfileInfo();
      

    }
  async getProfileInfo() : Promise<void>{
    this.http.post<AuthenticatedResponse>("http://localhost:5025/Information/Info", this.info, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })      
    })
    .subscribe((data: any) => {
      this.userInfo = data as UserInfo;
      console.log(data);
      console.log("Nothing appears here")
      })};
  
  profile = (form: NgForm) => {
    if (form.valid) {
      this.http.put<AuthenticatedResponse>("http://localhost:5025/Information/ChangeInfo", this.userInfo, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          console.log("The user has been successfully sent to the server");
          this.invalidReg = false;
          this.router.navigate(["/afterLogin"]);
        },
        error: (err: HttpErrorResponse) => this.invalidReg = true
      })
    }
  }

}

