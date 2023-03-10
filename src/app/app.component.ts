import { Component, OnInit } from '@angular/core';

import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  imgParent = '';
  showImg = true;
  token = "";

  constructor(
    private authSrv : AuthService,
    private userSrv : UsersService,
    private tokenSrv: TokenService
  ){

  }
  ngOnInit(): void {
    const token = this.tokenSrv.getToken();
    if(token){
      this.authSrv.profile().subscribe();
    }
  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.userSrv.create(
      {
        name : "nuevo",
        email : "mail@mail.com",
        password : "123"
      }
    ).subscribe();
  }

  login(){
    this.authSrv.login('nuevo','123')
    .subscribe(res => {
      this.token = res.access_token;
    });
  }


  getProfile(){
    this.authSrv.profile()
    .subscribe(res =>{
      console.log(res);
    });
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0) as Blob;
    /*this.filesService.uploadFile(file)
    .subscribe(rta => {
      console.log('upload', rta)
      this.imgRta = rta.location;
    })*/
  }

  logout(){
    this.authSrv.logout();
  }


}
