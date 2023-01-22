import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId : string | null= null;
  product : Product | null = null;
  constructor(
    private router : ActivatedRoute,
    private productsService: ProductsService,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.router.paramMap
    .pipe(
      switchMap( (params) => {
        this.productId = params.get('id');
        console.log(this.productId);
        if(this.productId){
          return this.productsService.getOne(this.productId);
        }
        return [null];
      })
    ).subscribe((data) => {
      this.product = data;
    });
  }

  goToBack(){
    this.location.back();
  }

}
