import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  categories: any[] = [];

  constructor(
    private storeService: StoreService,
    private categoriesSrv: CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories(){
    this.categoriesSrv.getAll()
    .subscribe((data) => {
      this.categories = data;
    });
  }

}
