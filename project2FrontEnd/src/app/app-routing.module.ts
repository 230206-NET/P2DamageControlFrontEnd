import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { PostLoginComponent } from './post-login/post-login.component';
import { RegisterComponent } from './register/register.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { ViewAllTicketsComponent } from './view-all-tickets/view-all-tickets.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'afterLogin', component: PostLoginComponent, canActivate: [AuthGuard]},
  {path: 'Register', component: RegisterComponent},
  {path: 'FileClaim', component: TicketFormComponent, canActivate: [AuthGuard]},
  {path: 'ViewClaims', component: ViewAllTicketsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
