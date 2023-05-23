import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy{

  public userProduct: Array <IProductResponse> = [];
  private eventSubscription!: Subscription;
  public currentCategoryName!: string;

    constructor (
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router

    ){
      this.eventSubscription = this.router.events.subscribe((event) =>{
        if(event instanceof NavigationEnd){
          this.loadProduct();
        }
      });
    }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(response => {
    //   this.currentProduct = response['product'];
    // })
  }

  loadProduct(): void{
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(categoryName).subscribe(date => {
      this.userProduct = date;
      this.currentCategoryName = this.userProduct[0].category.name;
    })
  }

  productCount(product: IProductResponse, value: boolean): void{
    if(value){
      ++product.count;
      console.log(product.count)
    } else if (!value && product.count > 1){
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void{
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')){
      basket=JSON.parse(localStorage.getItem('basket') as string);
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
      product.count = 1;
      this.orderService.changeBasket.next(true);
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }


}
