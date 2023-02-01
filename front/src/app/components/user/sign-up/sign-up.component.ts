import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SignUpService } from 'src/app/services/sign-up.service';
import { UserId } from 'src/app/models/user-id';
import { UserSignUp } from 'src/app/models/user-sign-up';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  options:UserId[] = [];
  invalidInput:Boolean = false;
  validInput:Boolean = false;
  errorMsg:string = "";
  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.adminOrUser();
    this.signUpService.getRefUserId().subscribe((val: any) => {
      val.data.forEach((data:any) => {
        this.options.push(data.user_id);
      });
    });
  }

  signUp(form : NgForm){
    if(form.invalid){
      this.invalidInput = true;
      this.validInput = false;
      this.errorMsg = "Invalid Forms.";
      return;
    }

    if(form.value.password !== form.value.confirm_password){
      this.invalidInput = true;
      this.validInput = false;
      this.errorMsg = "Password and Repeat Password are not same.";
      return;
    }
    const userInput: UserSignUp = {
      user_id: form.value.user_name,
      parent_id: form.value.parent_id, 
      your_name: form.value.your_name, 
      user_name: form.value.user_name, 
      mobile_number: form.value.mobile_number,
      password: form.value.password
    }

    this.signUpService.postUserSignUp(userInput).subscribe((responseData) => {
      this.invalidInput = false;
      this.validInput = true;
      form.reset();
      this.router.navigate(['/']);
    }, (error) => {
      if(error.error.success === 0){
        this.invalidInput = true;
        this.validInput = false;
        this.errorMsg = "Internal Server Error";
      }
    });
  }
}
