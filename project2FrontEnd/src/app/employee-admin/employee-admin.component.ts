import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtDecodingService } from '../services/jwt-decoding.service';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';

type Employees = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  accessLevel: number;
}
type UserAccessLevelChange = {
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
  constructor(private http: HttpClient, private router: Router, private jwtDecoder: JwtDecodingService){}
  Levels : Array<string> = ['Client', 'Employee', 'Manager', 'Admin'];
  Users : Array<Employees> = []
  ngOnInit(): void {
    this.translateEmployees();
  }
  retrieveEmployees() : Observable<Array<Employees>>{
    return this.http.get("http://localhost:5025/EmployeeAdmin/GetAllUsers") as Observable<Array<Employees>>
  }
  translateEmployees() : void{
    this.retrieveEmployees().subscribe((data: any) =>{
      this.Users = data;
    })
  }
  changeAccessLevel(Id: number, newLevel: number) : void{
    let updatedEmployee : UserAccessLevelChange = {
      userId: Id,
      accessLevel: newLevel,
      adminId: this.jwtDecoder.getId()
    }
    this.http.put<AuthenticatedResponse>("http://localhost:5025/EmployeeAdmin/UpdateUserAccessLevel", updatedEmployee, {
      headers: new HttpHeaders({"Content-Type":"application/json"})
    }).subscribe({
      next: (response: AuthenticatedResponse) => {
        this.router.navigate(["/AdminScreen"])
      }, error: (err: HttpErrorResponse) => console.log(err)
    })
  }
}
