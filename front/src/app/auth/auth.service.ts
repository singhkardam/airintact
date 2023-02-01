import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { userLogInUrl } from 'src/app/config/api';
import { LogIn } from 'src/app/models/log-in';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenTimer: any;
  private isAuthenticated: boolean = false;
  public token: string = "";
  public role: string = "";
  private authStatusListner = new Subject<boolean>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  getToken(){
    console.log("this", this.token);
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListner(){
    return this.authStatusListner.asObservable();
  }

  getRole(token: string){
    const extranctToken = atob(this.token.split('.')[1]);
    const extranctTokenVal = JSON.parse(extranctToken);
    if(extranctTokenVal.result.role === "admin" && 
       extranctTokenVal.result.user_id === "ravi@kardam.com" && 
       extranctTokenVal.result.parent_id === "root"){
      this.router.navigate(['/admin/dashboard']);
    }else if(extranctTokenVal.result.role === "user"){
        this.router.navigate(['/user/dashboard']);
    }
  }
  
  getUserData(){
    if(!this.token){
      return;
    }
    const extranctToken = atob(this.token.split('.')[1]);
    const extranctTokenVal = JSON.parse(extranctToken);
    return extranctTokenVal;
  }

 
  adminOrUser(){
    if(this.getIsAuth()){
      if(this.getUserData().result.role === "admin"){
        this.router.navigate(['/admin/dashboard']);
      }else if (this.getUserData().result.role === "user"){
        this.router.navigate(['/user/dashboard']);
      }
    }
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  userData:any;
  extranctToken:string = "";

  postUserLogIn(data: LogIn){
    return this.http.post<{success:number, message:string, token:string, expiresIn: number}>(userLogInUrl, data, this.httpOptions).subscribe((responseData) => {
      if(responseData.success === 1){
        const token = responseData.token;
        this.token = token;
        if(token){
          const expiresInDuration = responseData.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListner.next(true);
          
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.getRole(token);
        }
      }
    }, (error) => {
      if(error.error.success === 0){
        console.log(error);
      }
    })
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.getRole(this.token);
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
    }
  }

  logOut(){
    this.token = null;
    this.isAuthenticated = false;
    this.clearAuthData();
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date){
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData(){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expiration");
  }

  private getAuthData(){
    const token = window.localStorage.getItem("token");
    const expirationDate = window.localStorage.getItem("expiration");

    if(!token || !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate: new Date (expirationDate)
    }
  }

  setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    },  duration * 1000);    
  }

}
