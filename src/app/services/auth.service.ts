import { tap } from 'rxjs/operators';
import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL : string = 'https://young-sands-07814.herokuapp.com/api/users';

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
    });
  }
}
