import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { JwtResponse } from '../models/jwt-response'
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  readonly URL_API: string = "http://localhost:3000"
  // readonly URL_API_AWS = '';
  // readonly URL_API = 'http://localhost:27050'

  authSubject = new BehaviorSubject(false);
  private token: string = ""; 
  selectedUsuario: User;

  constructor(private http: HttpClient, private router: Router) { 
    this.selectedUsuario = new User();
  }

  register(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.URL_API + "/register", 
      user).pipe(tap(
        (res:JwtResponse) => {
          if(res) {
            // GUARDAR TOKEN
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn,
              res.dataUser.name, res.dataUser.email);
          }
        }
      ))
  }


  login(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.URL_API + "/login", 
      user).pipe(tap(
        (res:JwtResponse) => {
          if(res) {
            // GUARDAR TOKEN
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn,
              res.dataUser.name, res.dataUser.email);
          }
        }
      ))
  }


  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("NAME");
    localStorage.removeItem("EMAIL");
    this.router.navigate(['/']);
    
  }


  private saveToken(token: string, expiresIn: string, name: string, email: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    localStorage.setItem("NAME", name);
    localStorage.setItem("EMAIL", email);
    this.token = token;
  }


  private getToken(): string {
    if(!this.token) {
      this.token = JSON.parse(localStorage.getItem('ACCESS_TOKEN') || '{}');
    }
    return this.token;
  }
  
}
