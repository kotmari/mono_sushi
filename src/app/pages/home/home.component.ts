import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public allProduct: Array <IProductResponse> = [];
  private eventSubscription!: Subscription;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd){
        this.getAllProduct();
      }
    })
  }


  ngOnInit(): void {}

  getAllProduct():void{
    this.productService.getAllFirebase().subscribe(date =>{
      this.allProduct = date as IProductResponse[];
    })
  }

  productCount(product: IProductResponse, value: boolean): void{
    if(value){
      ++product.count;
    }else if (!value && product.count > 1){
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void{
    let basket: Array<IProductResponse> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      }else{
        basket.push(product);
      }
    }else{
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count=1;
    this.orderService.changeBasket.next(true);
  }

}
