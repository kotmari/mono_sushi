import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkaut',
  templateUrl: './checkaut.component.html',
  styleUrls: ['./checkaut.component.scss']
})
export class CheckautComponent implements  OnInit{

  public checkouts: Array<IProductResponse> = [];
  public total = 0;

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadCheckout();
    this.updateCheckout();

  }

  loadCheckout(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
    this.checkouts = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();

  }

  getTotalPrice(): void {
    this.total = this.checkouts.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }


  updateCheckout(): void {
    this.orderService.changeBasket.subscribe(()=>{
      this.loadCheckout();
    })
  }

  productCount(checkout: IProductResponse, value: boolean): void{
    if(value){
      ++checkout.count;
      localStorage.setItem('basket', JSON.stringify(this.checkouts))
    }else if (!value && checkout.count > 1){
      --checkout.count;
      localStorage.setItem('basket', JSON.stringify(this.checkouts));
    }
    this.updateCheckout();
    this.orderService.changeBasket.next(true);
  }
  deleteCheckoutProduct(checkout: IProductResponse): void{
    if (this.checkouts.some((prod) => prod.id === checkout.id)) {
      const index = this.checkouts.findIndex(
        (prod) => prod.id === checkout.id
      );
      this.checkouts.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.checkouts));
      this.updateCheckout();
      this.orderService.changeBasket.next(true);
    }
  }

}
