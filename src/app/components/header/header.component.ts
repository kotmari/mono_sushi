import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  OnInit{

  public baskets: Array<IProductResponse> = [];
  public total = 0;
  public count = 0;

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
    this. baskets = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getCountTotal();
  }

  getTotalPrice(): void {
    this.total = this.baskets.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }

  getCountTotal(): void {
    this.count = this.baskets.reduce(
      (count: number, prod: IProductResponse) =>
        count + prod.count,
      0
    );
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(()=>{
      this.loadBasket();
    })
  }

}
