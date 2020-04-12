import { ILogin } from '../models/ILogin';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';
import { IRegister } from '../models/IRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(
    private http: HttpClient
  ) { }

  authenticate(payload: ILogin): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, payload);
  }

  register(payload: IRegister): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, payload);
  }


  decodeToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }

  isUserAdmin(role: string): boolean {
    return role === 'Admin';
  }


}
