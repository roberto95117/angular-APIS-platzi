import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Product, CreateProductDto } from './../models/product.model';

import { retry } from 'rxjs/operators';

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
    return this.http.get<Product[]>(`${this.URL}products`, {params});
  }

  getProduct(id: string){
    return this.http.get<Product[]>(`${this.URL}products/${id}`);
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
    return this.http.get<Product[]>(`${this.URL}products/`)
      .pipe(retry(3));
  }


}
