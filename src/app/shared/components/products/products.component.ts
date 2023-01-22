import { Component, Input, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { Product, CreateProductDto, UpdateProductDto } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  @Input()
  set productId(id : string | null){
    if(id){
      this.onShowDetail(id);
    }
  }
  @Output() loadEvent: EventEmitter<any> = new EventEmitter();
  showProductsDetail : boolean = false;
  productChosen : Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id : '',
      name : ''
    },
    description: ''
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductsDetail = !this.showProductsDetail;
  }

  onShowDetail(id : string){
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
    .subscribe((data : any) => {
      //this.toggleProductDetail();
      if(!this.showProductsDetail){
        this.showProductsDetail = true;
      }
      this.productChosen = data;
      this.statusDetail = 'success';
    }, error => {
      console.error(error);
      this.statusDetail = 'error';
    });
  }

  createNewProduct(){
    const product: CreateProductDto = {
      title: 'Nueo producto',
      description: 'bla bla bla ',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 1
    }
    this.productsService.create(product)
    .subscribe((res) => {
      this.products.unshift(res);
    });
  }

  updateProduct(){
    const changes : UpdateProductDto = {
      title: 'nuevo titulo',
    };

    this.productsService.update(this.productChosen.id, changes)
    .subscribe((res) => {
      const index = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[index] = res;
      this.toggleProductDetail();
    });
  }

  deleteProduct(){
    this.productsService.delete(this.productChosen.id)
    .subscribe((res) => {
      const index = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(index,1);
      this.toggleProductDetail();
    });
  }


  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product: any) => {
        return this.productsService.update(product.id, {title : 'nuevo'})
      })
    ).subscribe((data) => {
      console.log(data);
    });

    zip(
      this.productsService.getProduct(id),
      this.productsService.update(id, {title : 'nuevo'})
    ).subscribe(response => {
      const read = response[0];
      const update = response[1];
    });
  }

  load(){
    this.loadEvent.emit();
  }

}
