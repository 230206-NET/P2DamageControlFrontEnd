import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { Tickets } from '../_interfaces/Tickets.model';
import jwt_decode from 'jwt-decode';
import { JwtDecodingService } from '../services/jwt-decoding.service';


type TicketDecision = {
  justification: string;
  userId: number;
  AccessLevel: number;
  status: number;
  ticketId: number;
}
@Component({
  selector: 'app-view-all-tickets',
  templateUrl: './view-all-tickets.component.html',
  styleUrls: ['./view-all-tickets.component.scss']
})
export class ViewAllTicketsComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private jwtDecoder: JwtDecodingService) { }
  FoundTickets: Array<Tickets> = []
  info: number = 0
  StatusValues: Array<string> = ["Pending", "Approved", "Denied"]
  accessLevel: number = 0;
  justification: string = "justification"
  reload: boolean = true
  //Sets Id and retrieves tickets
  ngOnInit(): void {
    const token: string | null = localStorage.getItem('jwt');
    if (token) {
      this.info = this.jwtDecoder.getId()
      if (typeof this.jwtDecoder.getAccessLevel() == 'number')
        this.accessLevel = this.jwtDecoder.getAccessLevel()
    }
    this.translatePendingTickets()
  }
  //Retrieves all tickets from Back-End
  getPendingTickets(): Observable<Array<Tickets>> {
    return this.http.get("https://damagecontrolbackend.azurewebsites.net/EmployeeViewTickets/GetPendingClaims") as Observable<Array<Tickets>>;
  }
  //Translates tickets to a form that the front-end can display
  translatePendingTickets(): void {
    this.getPendingTickets().subscribe((data: any) => {
      this.FoundTickets = data;
    });
  }
  //Rules on tickets based on the decision passed in
  approveTicket(ticketId: number, decision: number): void {
    let finalDecision: TicketDecision = {
      userId: this.info,
      status: decision,
      ticketId: ticketId,
      AccessLevel: this.accessLevel,
      justification: this.justification
    }
    console.log(finalDecision);
    this.http.put<AuthenticatedResponse>("https://damagecontrolbackend.azurewebsites.net/EmployeeViewTickets/UpdateTicketStatus", finalDecision, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe({
      next: (response: AuthenticatedResponse) => {
        if (this.reload) {

          location.reload()
        }
      }, error: (err: HttpErrorResponse) => console.log(err)
    })
  }
}

