import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { Tickets } from '../_interfaces/Tickets.model';

type TicketDecision = {
  ruling: number;
  ticketNumber: number;
}
@Component({
  selector: 'app-view-all-tickets',
  templateUrl: './view-all-tickets.component.html',
  styleUrls: ['./view-all-tickets.component.scss']
})
export class ViewAllTicketsComponent implements OnInit {
  constructor(private http : HttpClient, private router: Router) {}
  FoundTickets : Array<Tickets> = []
  StatusValues : Array<string> = ["Pending", "Approved", "Denied"]
  ngOnInit(): void {
    this.translatePendingTickets()
    
    
  }
  getPendingTickets() : Observable<Array<Tickets>>{
    return this.http.get("http://localhost:5025/ViewAllTickets/GetAllClaims") as Observable<Array<Tickets>>;
    }
    
    translatePendingTickets() : void{
      this.getPendingTickets().subscribe((data: any) => {
        console.log(data);
        this.FoundTickets = data;
      });
  }
  approveTicket(ticketId :number, decision: number) : void{
    let finalDecision : TicketDecision = {
      ruling : decision,
      ticketNumber : ticketId
    }
    console.log(finalDecision);
    this.http.post<AuthenticatedResponse>("http://localhost:5025/!!!!!!!!!!!!!!", finalDecision, {
      headers: new HttpHeaders({"Content-Type":"application/json"})
    }).subscribe({
      next: (response: AuthenticatedResponse) => {
        this.router.navigate(["/ViewClaims"])

      }, error: (err: HttpErrorResponse) => console.log(err)
    })
  }
  }

