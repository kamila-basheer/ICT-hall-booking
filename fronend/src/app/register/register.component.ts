import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  registerUserData = {username:'',
  email:'',
  password:'',
  mobile:''};

  constructor() { }

  ngOnInit(): void {
    
  }
  registerUser(){
    console.log(this.registerUserData);
    // this._auth.registerUser(this.registerUserData)
    // .subscribe ((data:any)=>{
    //   console.log(data);
    //   localStorage.setItem('token', data.token);
    //   this.router.navigate(['login']);
    // })
      
  }

}
