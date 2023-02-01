export class UserSignUp {
  user_id:string;
  parent_id:string;
  your_name:string;
  user_name:string;
  mobile_number:number;
  password:string;
    constructor(user_id:string, parent_id:string, your_name:string, user_name:string, mobile_number:number, password:string){
      this.user_id = user_id;
      this.parent_id = parent_id;
      this.your_name = your_name;
      this.user_name = user_name;
      this.mobile_number = mobile_number;
      this.password = password;
    }    
}