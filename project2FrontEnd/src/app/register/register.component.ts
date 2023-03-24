import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from '../_interfaces/register.model';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  invalidReg: boolean | undefined;
  info: RegisterModel = { Username: '', Password: '', Email: '', FullName: '' }
  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {

  }
  //Transmits info in the registration form to the back-end db to create a new user
  register = (form: NgForm) => {
    if (form.valid) {
      console.log(this.info);
      this.http.post<AuthenticatedResponse>("https://damagecontrolbackend.azurewebsites.net/Register/Register", this.info, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      })
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            console.log("The user has been successfully sent to the server");
            this.invalidReg = false;
            this.router.navigate(["/"]);
          },
          error: (err: HttpErrorResponse) => this.invalidReg = true
        })
    }
    this.invalidReg = true
  }

}
