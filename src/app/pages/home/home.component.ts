import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  offset = 0;
  limit = 5;
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.load();
    this.route.queryParamMap
    .subscribe(params => {
      this.productId = params.get('product');
    });
  }


  load(){
    this.productsService.getAllByPage(this.limit,this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
