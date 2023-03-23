import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtDecodingService } from '../services/jwt-decoding.service';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';

export type Employees = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  accessLevel: number;
}
export type UserAccessLevelChange = {
  userId: number;
  accessLevel: number;
  adminId: number;

}
@Component({
  selector: 'app-employee-admin',
  templateUrl: './employee-admin.component.html',
  styleUrls: ['./employee-admin.component.scss']
})
export class EmployeeAdminComponent implements OnInit {
  constructor(private http: HttpClient, public router: Router, public jwtDecoder: JwtDecodingService) { }
  Levels: Array<string> = ['Client', 'Employee', 'Manager', 'Admin'];
  Users: Array<Employees> = []
  reload: boolean = true;
  //Calls the method that shows all users
  ngOnInit(): void {
    this.translateEmployees();
  }
  //Returns an observable containing all users
  retrieveEmployees(): Observable<Array<Employees>> {
    return this.http.get("http://localhost:5025/EmployeeAdmin/GetAllUsers") as Observable<Array<Employees>>
  }
  //Translates the observable containing all users to a format that can be displayed
  translateEmployees(): void {
    this.retrieveEmployees().subscribe((data: any) => {
      this.Users = data;
    })
  }
  //Changes the access level to the one specified by the admin
  changeAccessLevel(Id: number, newLevel: number): void {
    let updatedEmployee: UserAccessLevelChange = {
      userId: Id,
      accessLevel: newLevel,
      adminId: this.jwtDecoder.getId()
    }
    this.http.put<AuthenticatedResponse>("http://localhost:5025/EmployeeAdmin/UpdateUserAccessLevel", updatedEmployee, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: AuthenticatedResponse) => {
        alert("Employee #" + Id + " has been made " + this.Levels[newLevel])
        if (this.reload) {
          location.reload()

        }
      }, error: (err: HttpErrorResponse) => console.log(err)
    })
  }
}
