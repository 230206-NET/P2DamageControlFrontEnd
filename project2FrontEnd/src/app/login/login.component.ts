import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  LoginModel } from '../_interfaces/login.model';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean | undefined;
  credentials: LoginModel = {username:'', password:''};
  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    
  }
  //Sets up form for login, and transmits the info to the back-end to compare info to DB
  login = ( form: NgForm) => {
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("http://localhost:5025/NewLogIn/LogIn", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/afterLogin"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }
}
