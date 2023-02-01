import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { accountUrl } from '../config/api';
import { AccountDetails } from '../models/account-details';
@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  updateAccountDetails(data: AccountDetails){
    return this.http.patch(accountUrl, data, this.httpOptions);
  }
}
