import { tap, switchMap } from 'rxjs/operators';
import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL : string = 'http://damp-spire-59848.herokuapp.com/api/users';
  private user = new BehaviorSubject<User | null>(null);

  user$ = this.user.asObservable();

  constructor(
    private http : HttpClient,
    private tokenSrv: TokenService
  ) { }

  login(pass: string, email : string){
    return this.http.post<Auth>(`${this.URL}/login`, {email, pass})
    .pipe(
      tap( response => {
        this.tokenSrv.saveToken(response.access_token);
      })
    );
  }

  profile(){
    return this.http.get<User>(`${this.URL}/profile`, {
      /*headers : {
        Authorization : `Bearer ${token}`
      }*/
    }).pipe
    (
      tap(user => this.user.next(user))
    );
  }

  logout(){
    this.tokenSrv.removeToken();
  }
}
