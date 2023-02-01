import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountDetailsService } from 'src/app/services/account-details.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountDetails } from 'src/app/models/account-details';
@Component({
  selector: 'app-user-account-details',
  templateUrl: './user-account-details.component.html',
  styleUrls: ['./user-account-details.component.scss']
})
export class UserAccountDetailsComponent implements OnInit {

  constructor(private accountDetailsService: AccountDetailsService,
              private authService: AuthService) { }

  ngOnInit(): void {
  }
  onAccountSubmit(accountSubmitForm : NgForm){
    if(accountSubmitForm.invalid){
      return;
    }
    if(accountSubmitForm.form.value.account_number !== accountSubmitForm.form.value.account_number){
        console.log("Not a valid account number");
        return
    }
    const userLogInInput: AccountDetails = {
        account_number : accountSubmitForm.form.value.account_number,
        account_name : accountSubmitForm.form.value.account_name,
        bank_ifsc_code : accountSubmitForm.form.value.bank_ifsc_code,
        user_id: this.authService.getUserData().result.user_id
    }
    if(!accountSubmitForm.invalid){
      this.accountDetailsService.updateAccountDetails(userLogInInput).subscribe((result) => {
        console.log(result);
      })
    }
  }
}
