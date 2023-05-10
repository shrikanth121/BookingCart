import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'app/category.service';
import { ProductService } from 'app/product.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product:any={};
  id;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private categories:CategoryService, 
    private productService:ProductService) { 
    this.categories$=categories.getCategories();

    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id) productService.get(this.id).take(1).subscribe(p => this.product=p);
  }

  ngOnInit() {
  }

  save(product){
    if(this.id) this.productService.update(this.id,product);
    else  this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm("Are you sure you want to delete?")){
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
