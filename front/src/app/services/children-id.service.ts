import { Injectable } from '@angular/core';
import { childrenOfUserUrl } from '../config/api'; 
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ChildrenOfUser } from '../models/children-of-user';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChildrenIdService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  childrenIds(refId: string): Observable<ChildrenOfUser[]>{
    return this.http.get<ChildrenOfUser[]>(`${childrenOfUserUrl}/${refId}`);
  }
}
