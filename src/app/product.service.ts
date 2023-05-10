import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Product } from './models/product';

@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
   return this.db.list('/products').push(product);
  }

  getAll():Observable<Product[]>{
    return this.db.list('/products');
  }

  get(productId){
    return this.db.object('/products/'+productId);
  }

  update(productId,product){
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId){
    this.db.object('/products/'+productId).remove();
  }
}
