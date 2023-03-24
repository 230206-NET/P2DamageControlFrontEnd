import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { Tickets } from '../_interfaces/Tickets.model';
import jwt_decode from 'jwt-decode';
import { JwtDecodingService } from '../services/jwt-decoding.service';

type UserId = {
  Id: number;
}

@Component({
  selector: 'app-view-own-tickets',
  templateUrl: './view-own-tickets.component.html',
  styleUrls: ['./view-own-tickets.component.scss']
})
//Component to allow users to view their own tickets
export class ViewOwnTicketsComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private jwtDecoder: JwtDecodingService) { }
  info: UserId = { Id: 0 }
  FoundTickets: Array<Tickets> = []
  StatusValues: Array<string> = ["Pending", "Approved", "Denied"]
  //Acceses the JWT token to save the Id to a variable
  ngOnInit(): void {
    const token: string | null = localStorage.getItem('jwt');
    if (token) {
      this.info.Id = this.jwtDecoder.getId();
    }
    this.getOwnTickets();

  }
  //Retrieves a list of the user's tickets using their JWT Id number, and adds them to a variable to display them
  getOwnTickets(): void {
    this.http.put<AuthenticatedResponse>("https://damagecontrolbackend.azurewebsites.net/ClientViewTickets/GetAllClaims", this.info, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })

    })
      .subscribe((data: any) => {
        this.FoundTickets = data as Array<Tickets>;
      });
  }

}
