import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { EmployeeGuard } from './auth/employee.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { PostLoginComponent } from './post-login/post-login.component';
import { RegisterComponent } from './register/register.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { ViewAllTicketsComponent } from './view-all-tickets/view-all-tickets.component';
import { ViewProfileInfoComponent } from './view-profile-info/view-profile-info.component';
import { ViewOwnTicketsComponent } from './view-own-tickets/view-own-tickets.component';
import { EmployeeAdminComponent } from './employee-admin/employee-admin.component';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'afterLogin', component: PostLoginComponent, canActivate: [AuthGuard]},
  {path: 'Register', component: RegisterComponent},
  {path: 'FileClaim', component: TicketFormComponent, canActivate: [AuthGuard]},
  {path: 'ViewClaims', component: ViewAllTicketsComponent, canActivate: [AuthGuard, EmployeeGuard]},
  {path: 'notAuthorized', component: NotAuthorizedComponent},
  {path: 'ViewProfile', component: ViewProfileInfoComponent, canActivate: [AuthGuard]},
  {path: 'ViewTickets', component: ViewOwnTicketsComponent, canActivate: [AuthGuard]},
  {path: 'AdminScreen', component: EmployeeAdminComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
