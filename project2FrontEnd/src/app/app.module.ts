import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostLoginComponent } from './post-login/post-login.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { ViewAllTicketsComponent } from './view-all-tickets/view-all-tickets.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { ViewOwnTicketsComponent } from './view-own-tickets/view-own-tickets.component';
import { ViewProfileInfoComponent } from './view-profile-info/view-profile-info.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    PostLoginComponent,
    LoginComponent,
    RegisterComponent,
    TicketFormComponent,
    ViewAllTicketsComponent,
    NotAuthorizedComponent,
    ViewOwnTicketsComponent,
    ViewProfileInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:5025"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
