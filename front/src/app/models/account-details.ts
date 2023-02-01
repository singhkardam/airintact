export class AccountDetails {
    account_number : string;
    account_name : string;
    bank_ifsc_code : string;
    user_id: string;
    constructor(
        account_number: string, 
        account_name: string, 
        bank_ifsc_code: string,
        user_id: string
        ){
            this.account_name = account_name;
            this.account_number = account_number;
            this.bank_ifsc_code = bank_ifsc_code;
            this.user_id = user_id;
        }
}
