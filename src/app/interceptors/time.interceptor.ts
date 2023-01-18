import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const CHEK_TIME = new HttpContextToken<boolean>(() => true);

export function checkTime() {
  return new HttpContext().set(CHEK_TIME, true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {



  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(CHEK_TIME)){//VALIDA SI HACE LE INTERCEPTOR DEL TIEMPO DE LA PETICION
      const  start = performance.now();
      return next
      .handle(request)
      .pipe(
        tap( res => {
          const time = (performance.now() - start ) + 'ms';
          console.log(request.url, time);
        })
      );
    }else {
      return next.handle(request);
    }
  }
}
