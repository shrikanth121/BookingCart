import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { AppUser } from 'app/models/app-user';
import { ShoppingCart } from 'app/models/shopping-cart';
import { ShoppingCartService } from 'app/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
 appUser:AppUser;
 cart$:Observable<ShoppingCart>;
 shoppingCartItemsCount:number;

  constructor(private auth: AuthService,private shoppingCartService:ShoppingCartService) {
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    
    let cart$=await this.shoppingCartService.getCart();
    
    cart$.subscribe(c => this.shoppingCartItemsCount=c.totalItemsCount);
    
  }

  logout(){
    this.auth.logout();
  }

}
