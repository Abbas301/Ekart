import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message:string = "";
  error:string = '';
  isLoading = false;
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm:NgForm) {
    this.isLoading=true;
    this.auth.loginUser(loginForm.value).subscribe(res => {
      this.isLoading=false;
      
      localStorage.setItem("userDetails",JSON.stringify(loginForm.value))
      this.router.navigate([`/product`])
    }, err => {
      this.error='server error cant login'
    })
  }


}
