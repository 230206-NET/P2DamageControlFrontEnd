import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { FormsModule, NgForm } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import { JwtDecodingService } from '../services/jwt-decoding.service';

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
  info: UserId = { Id: 0 }
  userInfo: UserInfo = {
    password: '',
    username: '',
    fullName: '',
    email: '',
    accessLevel: 0,
    id: 0
  }

  constructor(public router: Router, private http: HttpClient, private jwtDecoder: JwtDecodingService) { }
  //Retrieves the Id from the jwt token and then calls the method to add the info to the inputs
  async ngOnInit(): Promise<void> {
    const token: string | null = localStorage.getItem('jwt');
    if (token) {
      this.info.Id = this.jwtDecoder.getId();
    }
    await this.getProfileInfo();


  }
  //Retrieves the info from the user's profile. Password will not be included
  async getProfileInfo(): Promise<void> {
    this.http.post<AuthenticatedResponse>("http://localhost:5025/Information/Info", this.info, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    })
      .subscribe((data: any) => {
        this.userInfo = data as UserInfo;
        console.log(data);
        console.log("Nothing appears here")
      })
  };
  //Changes the current user's info to match what was entered into the relevant fields
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
    return;
  }

}

