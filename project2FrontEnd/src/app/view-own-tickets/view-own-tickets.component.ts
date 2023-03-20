import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { Tickets } from '../_interfaces/Tickets.model';
import jwt_decode from 'jwt-decode';

type UserId = {
  Id: number;
}

@Component({
  selector: 'app-view-own-tickets',
  templateUrl: './view-own-tickets.component.html',
  styleUrls: ['./view-own-tickets.component.scss']
})
export class ViewOwnTicketsComponent implements OnInit{
  constructor(private http : HttpClient, private router: Router) {}
  info: UserId = {Id: 0}
  FoundTickets : Array<Tickets> = []
  StatusValues : Array<string> = ["Pending", "Approved", "Denied"]
  ngOnInit(): void {
    const token: string | null = localStorage.getItem('jwt');
      if(token){
        const decodedToken: any= jwt_decode(token);
        console.log(decodedToken);
        const Id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber'];
        this.info.Id = Id;
        console.log(this.info.Id);
      }      
      this.getOwnTickets();

    }    
  
  getOwnTickets() : void{
    this.http.put<AuthenticatedResponse>("http://localhost:5025/ClientViewTickets/GetAllClaims", this.info, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })

    })
    .subscribe((data: any) => {
      this.FoundTickets = data as Array<Tickets>;
    });
    }

}
