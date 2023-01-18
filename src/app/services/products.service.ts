import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';

import { Product, CreateProductDto } from './../models/product.model';

import { catchError, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  URL : string = 'https://young-sands-07814.herokuapp.com/api/';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit? : number, offset? : number) {
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.URL}products`, {params})
    .pipe(
      map(products => products.map( item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string){
    return this.http.get<Product[]>(`${this.URL}products/${id}`)
    .pipe(
      catchError((error : HttpErrorResponse) => {
        if(error.status === HttpStatusCode .InternalServerError){
          return throwError('Error en el servidor');
        }else if (error.status === HttpStatusCode.NotFound){
          return throwError('No existe ');
        }else if (error.status === HttpStatusCode.Unauthorized){
          return throwError('No tienes permiso para ver este recurso');
        }
        return throwError('algo salio mal');
      })
    );
  }

  create(data : CreateProductDto){
    return this.http.post<Product>(`${this.URL}products`, data);
  }

  update(id: string, dto : any){
    return this.http.put<Product>(`${this.URL}products/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<any>(`${this.URL}products/${id}`);
  }

  getAllByPage(limit : number, offset : number){
    return this.http.get<Product[]>(`${this.URL}products/`, {
      params: { limit, offset}
    });
  }

  getAllProductsRetry() {
    return this.http.get<Product[]>(`${this.URL}products/`, {context : checkTime()})
      .pipe(retry(3));
  }


}
