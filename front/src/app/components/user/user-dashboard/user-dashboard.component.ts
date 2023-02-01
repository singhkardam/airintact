import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ChildrenIdService } from 'src/app/services/children-id.service';
import { ChildrenOfUser } from 'src/app/models/children-of-user';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  totalEarning:number = 0;
  userInfo:any;
  paymentLink:boolean = false;
  hasAccountInfo:boolean;
  userName:string = "";
  toggleIcon: boolean = true;
  accountDetails: string = "Account Details";
  childIdInfo: ChildrenOfUser[] = [];
  unSuccessId: number;
  successId: number;
  constructor(private authService: AuthService, private childrenIdService: ChildrenIdService) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserData();
    this.userName = this.userInfo.result.your_name;
    console.log(this.userInfo);
    if(this.userInfo.result.user_payment === "null"){
      this.paymentLink = true;
    }
    if(this.userInfo.result.account_number == null){
      this.hasAccountInfo = true;
    }
    this.childrenIdService.childrenIds(this.userInfo.result.user_id).subscribe((response: any) => {
      if(response.success === 1){
          this.childIdInfo = response.data;
          this.unSuccessId = this.childIdInfo.filter(val => val.user_payment == "null").length;
          this.successId = this.childIdInfo.filter(val => val.user_payment == "true").length;
          this.totalEarning = Math.floor(this.successId / 6);          
      }
    },
    (error) => {

    },
    () => {

    }
    );
  }

}
