import {Component, OnInit} from '@angular/core';
import { IProductResponse } from '../../shared/interface/product/product.interface';
import { ProductService } from '../../shared/services/product/product.service';
import { OrderService } from '../../shared/services/order/order.service';




@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss']
})
export class BasketDialogComponent implements OnInit{

  public baskets: Array<IProductResponse> = [];
  public total = 0;
  public count = 0;


  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) { }


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

  productCount(product: IProductResponse, value: boolean): void{
    if(value){
      ++product.count;
      localStorage.setItem('basket', JSON.stringify(this.baskets));
    }else if (!value && product.count > 1){
      --product.count;
      localStorage.setItem('basket', JSON.stringify(this.baskets));
    }
    this.updateBasket();
    this.orderService.changeBasket.next(true);
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

  deleteBasketProduct(product: IProductResponse): void {
    if (this.baskets.some((prod) => prod.id === product.id)) {
      const index = this.baskets.findIndex(
        (prod) => prod.id === product.id
      );
      this.baskets.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.baskets));
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }
  }

}
