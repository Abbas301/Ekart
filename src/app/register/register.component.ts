import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
message:string = "";
error:string = "";
isLoading = false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  onRegister(registrationForm:NgForm) {
     this.isLoading = true;
     this.auth.registerUser(registrationForm.value).subscribe(res => {
       this.isLoading=false;
       localStorage.setItem('userDetails',JSON.stringify(registrationForm.value))
       registrationForm.reset();
       if(!res.error) {
         this.message= 'User registered successfully please log in'
       }
       else {
         this.error = res.message
       }
     },err => {
       this.error = 'some error occured'
     })
  }
}
