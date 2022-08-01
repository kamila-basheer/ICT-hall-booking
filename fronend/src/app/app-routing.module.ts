import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookHallComponent } from './book-hall/book-hall.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:"book-your-hall",component:BookHallComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: SignupComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
