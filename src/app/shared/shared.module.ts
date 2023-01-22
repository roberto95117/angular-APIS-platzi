import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../shared/components/product/product.component';
import { ProductsComponent } from '../shared/components/products/products.component';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { ImgComponent } from '../shared/components/img/img.component';
import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
  ]
})
export class SharedModule { }
