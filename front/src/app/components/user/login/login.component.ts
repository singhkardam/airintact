import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { LogIn } from 'src/app/models/log-in';
import { LogInService } from 'src/app/services/log-in.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  checked = false;
  getUserRole : any = "";
  constructor(
    private logInService : LogInService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.authService.adminOrUser();
  }

  logIn(form : NgForm){
    if(form.invalid){
      return;
    }
    const userLogInInput: LogIn = {
      user_name: form.value.user_name, 
      password: form.value.password
    }
    this.authService.postUserLogIn(userLogInInput);
  }
}
