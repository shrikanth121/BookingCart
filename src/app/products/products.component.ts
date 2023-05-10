import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'app/category.service';
import { Product } from 'app/models/product';
import { ProductService } from 'app/product.service';
import { ShoppingCartService } from 'app/shopping-cart.service';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy{
  products:Product[]=[];
  filteredProducts:Product[]=[];
  category:string;
  cart:any;
  subscription: Subscription;

  constructor(
    route:ActivatedRoute,
    private productService:ProductService,
    private shoppingCartService:ShoppingCartService) {
    
      this.productService
    .getAll()
    .switchMap(products => {
      this.products=products;
      return route.queryParamMap;
    })
    .subscribe(params => {
        this.category=params.get('category');
  
        this.filteredProducts=(this.category)?
        this.products.filter(p => p.category===this.category):
        this.products;
      });
   }

   async ngOnInit() {
     this.subscription=(await this.shoppingCartService.getCart()).subscribe(cart => this.cart=cart);
   }

   ngOnDestroy() {
       this.subscription.unsubscribe();
   }

}
