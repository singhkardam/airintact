import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { userIdUrl, userSignUpUrl } from 'src/app/config/api';
import { UserId } from 'src/app/models/user-id';
import { UserSignUp } from 'src/app/models/user-sign-up';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getRefUserId(): Observable<UserId[]>{
    return this.http.get<UserId[]>(userIdUrl);
  }
  
  postUserSignUp(data: UserSignUp){
     return this.http.post<UserSignUp[]>(userSignUpUrl, data, this.httpOptions)
  }
  
}
