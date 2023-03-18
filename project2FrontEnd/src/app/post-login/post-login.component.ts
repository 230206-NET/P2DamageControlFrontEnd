import { Component, OnInit } from '@angular/core';
import { JwtDecodingService } from '../services/jwt-decoding.service';

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss']
})
export class PostLoginComponent implements OnInit {
  constructor(private service: JwtDecodingService){}
  AccessLevel : number = 0;
  ngOnInit(): void {
    this.AccessLevel = this.service.getAccessLevel()

  }


}
