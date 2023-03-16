import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { Tickets } from '../_interfaces/Tickets.model';

@Component({
  selector: 'app-view-all-tickets',
  templateUrl: './view-all-tickets.component.html',
  styleUrls: ['./view-all-tickets.component.scss']
})
export class ViewAllTicketsComponent implements OnInit {
  constructor(private http : HttpClient) {}
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
  }

