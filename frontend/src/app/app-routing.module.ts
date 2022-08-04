import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AuthGuard } from './auth.guard';
import { BookHallComponent } from './book-hall/book-hall.component';
import { CurrentBookingComponent } from './current-booking/current-booking.component';
import { EditCalendarComponent } from './edit-calendar/edit-calendar.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { ViewCalendarComponent } from './view-calendar/view-calendar.component';

const routes: Routes = [
  {path:"book-your-hall",
  canActivate:[AuthGuard],
  component:BookHallComponent},
  {path:"view-calendar", 
  canActivate:[AuthGuard], 
  component:ViewCalendarComponent},
  {path:"dashboard", 
  canActivate:[AuthGuard],
  component:UserDashboardComponent},
  {path:"edit-calendar",
  canActivate:[AuthGuard],
  component:EditCalendarComponent},
  {path:"current-bookings",
  canActivate:[AuthGuard],
  component:CurrentBookingComponent},
  {path:"admin-dashboard",
  canActivate:[AuthGuard],
  component:AdminDashboardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: SignupComponent},
  {path:'adm-login', component:AdminloginComponent}
  {path: 'login', component: UserloginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
