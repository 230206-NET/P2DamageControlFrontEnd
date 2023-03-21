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
  //Gets access level of current user to customize their options
  async ngOnInit(): Promise<void> {
    this.AccessLevel = await this.service.getAccessLevel()
    

  }


}
