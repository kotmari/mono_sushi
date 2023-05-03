import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkaut',
  templateUrl: './checkaut.component.html',
  styleUrls: ['./checkaut.component.scss']
})
export class CheckautComponent implements  OnInit{

  public checkauts: Array<IProductResponse> = [];
  public total = 0;
 
  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadCheckaut();
    this.updateBasket();
    
  }

  loadCheckaut(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
    this.checkauts = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    
  }

  getTotalPrice(): void {
    this.total = this.checkauts.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }


  updateBasket(): void {
    this.orderService.changeBasket.subscribe(()=>{
      this.loadCheckaut();
    })
  }

} {

}
