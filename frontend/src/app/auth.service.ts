import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  registerUser(associate:any){
    console.log(associate);
    return this.http.post("http://localhost:3000/register", associate);
    
  }

  loginUser(associate:any){
    console.log(associate);
    return this.http.post<any>("http://localhost:3000/login", associate);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }

}
