import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, LoginResponse } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(body: User): Observable<LoginResponse>{
    return this._http.post<LoginResponse>(`${environment.apiUrl}users/login`, body);
  }

  signup(body: User): Observable<User>{
    return this._http.post<User>(`${environment.apiUrl}users/signup`, body);
  }
}
