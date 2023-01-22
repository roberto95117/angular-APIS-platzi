import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  template: `<app-products [productId]="productId" [products]="products" (loadEvent)="load()"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  offset = 0;
  limit = 5;
  products: Product[] = [];
  productId: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe( params => {
      this.categoryId = params.get('id');
      this.load();
    });
    this.route.queryParamMap
    .subscribe(params => {
      this.productId = params.get('product');
    });
  }

  load(){
    if(this.categoryId !== null){
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
    }
  }

}
