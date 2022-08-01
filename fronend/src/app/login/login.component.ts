import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {username:'',
  password:'',
  };

  constructor(private _auth:AuthService, public router:Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    console.log(this.loginUserData);
    this._auth.loginUser(this.loginUserData)
    .subscribe ((data:any)=>{
      
      console.log(data);
      localStorage.setItem('token', data.token);
      this.router.navigate(['home']);
      }
    )
    
    
  }

}
