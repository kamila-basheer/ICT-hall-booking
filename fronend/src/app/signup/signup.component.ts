import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerUserData = {username:'',
  email:'',
  password:'',
  confirmPassword:''
  };

  constructor(private _auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
    .subscribe ((data:any)=>{
      console.log(data);
      localStorage.setItem('token', data.token);
      this.router.navigate(['login']);
    })
      
  }

}
