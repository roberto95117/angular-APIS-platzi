import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenSrv: TokenService,
    private router: Router,
    private authSrv: AuthService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //return con token
    /*
    const token = this.tokenSrv.getToken();
    if(!token ){
      this.router.navigate(['/home']);
    }
    return true;
    */

    //return con observable
    return this.authSrv.user$
    .pipe(
      map(user  => {
        if(!user){
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }

}
