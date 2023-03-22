import { Component, NgModule, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../_interfaces/AuthenticatedResponse';
import { FormsModule, NgForm } from '@angular/forms';
import { NewTicketModel } from '../_interfaces/NewClaim.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})

export class TicketFormComponent implements OnInit {
  key: string = "16aed8bb2db92dc0d6f5e6ca7059b194ff52b92228ecae25f58b2e8b15e9eaded61953912";
  NewClaim: NewTicketModel = {
    ClientId: 0,
    Amount: 0,
    DamageDate: new Date().toISOString(),
    DamagerId: 0,
    Description: ''
  }
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3NlcmlhbG51bWJlciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiNk9mQ3Jvd3MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJLYXogQnJla2tlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IjEiLCJleHAiOjE2Nzk0NDA0MDIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAyNSJ9.0AWxosew_Q0MoCyq00ZAd2-aGdiwMHs7kNCWpCM1h84"
  DamagerName: string = '';
  constructor(public router: Router, private http: HttpClient) { }
  ngOnInit(): void {
  }
  submitClaim = async (form: NgForm) => {
    if (form.valid) {
      if (this.token) {
        const decodedToken: any = jwt_decode(this.token);
        const Id = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/serialnumber'];
        this.NewClaim.ClientId = Id;
        if (this.DamagerName != null) {
          const response = await this.getDamageId(this.DamagerName).then((value: number) => {
            this.NewClaim.DamagerId = value;
          })
          await this.http.post<AuthenticatedResponse>("http://localhost:5025/TicketForm/SubmitClaim", this.NewClaim, {
            headers: new HttpHeaders({ "Content-Type": "application/json" })
          })
            .subscribe({
              next: (response: AuthenticatedResponse) => {
                this.router.navigate(["/afterLogin"]);
              },

              error: (err: HttpErrorResponse) => {

              }
            });

        }

      }
    }
    console.log("Failed")
  }
  async getDamageId(damagerName: string): Promise<number> {
    const hash = CryptoJS.MD5(this.key).toString();
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&name=${damagerName}&apikey=8ecae25f58b2e8b15e9eaded61953912&hash=${hash}`);
    const data = await response.json();
    try {
      return data.data.results[0].id;
    } catch (err) {
      window.alert("Not a valid character. Please try again");
      return new Promise(function (resolve, reject) {
        resolve(0)
      });
    }
  }


  async retrieveDamagers(): Promise<void> {
    let relevantHeroes: string[] = [];
    const damageInfo = this.DamagerName;
    const hash = CryptoJS.MD5(this.key).toString();
    const res = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&nameStartsWith=${damageInfo}&apikey=8ecae25f58b2e8b15e9eaded61953912&hash=${hash}`);
    const data = await res.json();
    for (let i = 0; i < 5; i++) {
      if (data.data.results[i] != null) {
        const hero = data.data.results[i].name;
        const heroList = document.getElementById('possibleheroes') as HTMLSelectElement;
        const opt = document.createElement('option');
        opt.value = hero;
        opt.innerHTML = hero;
        heroList.appendChild(opt);
      } else {
        break;
      }
    }
  }
}
