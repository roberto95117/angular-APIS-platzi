import { UserDTO, User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  URL : string = 'https://young-sands-07814.herokuapp.com/api/users';

  constructor(
    private http : HttpClient
  ) { }

  create(dto : UserDTO){
    return this.http.post<UserDTO>(this.URL, dto);
  }

  getAll(){
    return this.http.get<User[]>(this.URL);
  }



}
