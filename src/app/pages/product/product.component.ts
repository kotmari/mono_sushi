import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
 
  public userProduct: Array <IProductResponse> = []



  constructor ( private productService: ProductService){}

  ngOnInit(): void {
    this.getProduct();
    
  }

  getProduct(): void{
    this.productService.getAll().subscribe(date => {
      this.userProduct = date;
    })
  }


}
