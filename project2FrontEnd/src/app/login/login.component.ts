import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  LoginModel } from '../_interfaces/login.model';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean | undefined;
  credentials: LoginModel = {Username:'', Password:''};
  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    
  }
  login = ( form: NgForm) => {
    if (form.valid) {
      console.log(this.credentials)
      this.http.post<AuthenticatedResponse>("http://localhost:5025/NewLogIn/LogIn", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          console.log("This is working");
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
