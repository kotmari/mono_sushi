import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketDialogComponent } from './basket-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { IProductResponse } from '../../shared/interface/product/product.interface';
import { OrderService } from '../../shared/services/order/order.service';
import { ProductService } from '../../shared/services/product/product.service';



describe('BasketDialogComponent', () => {
  let component: BasketDialogComponent;
  let fixture: ComponentFixture<BasketDialogComponent>;
  let orderService: OrderService;
  let productService: ProductService;
  const products: IProductResponse[] = [{
    id: '1',
    category: {
      id:'2',
      name: 'rolls',
      path: 'roll',
      imagePath: 'category.jpg'
    },
    name: 'roll',
    path: 'product',
    description: 'qqq',
    weight: '0.33',
    price: 10.99,
    imagePath: 'product.jpg',
    count: 5
  },
    {
      id:'1',
      category: {
        id: '2',
        name: 'rolls',
        path: 'roll',
        imagePath: 'category.jpg'
      },
      name: 'roll',
      path: 'product',
      description: 'qqq',
      weight: '0.33',
      price: 10.99,
      imagePath: 'product.jpg',
      count: 1
    }];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketDialogComponent ],
      imports:[
        HttpClientTestingModule,
        MatIconModule
      ],
      providers: [ProductService, OrderService],


    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketDialogComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    orderService = TestBed.inject(OrderService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should calculate the total price of products in the basket', () => {

    const totalPrice = products.reduce((total, prod) => total + prod.count * prod.price, 0);
    component.baskets = products;
    component.getTotalPrice();
    expect(component.total).toEqual(totalPrice);
  });

  it('should decrease product count and update the basket', () => {
    const product: IProductResponse = {
      id: '1',
      category: {
        id: '2',
        name: 'rolls',
        path: 'roll',
        imagePath: 'category.jpg'
      },
      name: 'roll',
      path: 'product',
      description: 'qqq',
      weight: '0.33',
      price: 10.99,
      imagePath: 'product.jpg',
      count: 3
    };
    const updatedProduct: IProductResponse = { ...product, count: 2 };

    spyOn(localStorage, 'setItem');
    spyOn(orderService.changeBasket, 'next');

    component.productCount(product, false);

    expect(product.count).toEqual(updatedProduct.count);
    expect(localStorage.setItem).toHaveBeenCalledWith('basket', JSON.stringify(component.baskets));
    expect(orderService.changeBasket.next).toHaveBeenCalledWith(true);
  });


  it('should calculate the total count of products in the basket', () => {
    const totalCount = products.reduce((count, prod) => count + prod.count, 0);
    component.baskets = products;
    component.getCountTotal();
    expect(component.count).toEqual(totalCount);
  });

  it('should increase product count and update the basket', () => {
    const product: IProductResponse = {
      id: '1',
      category: {
        id: '2',
        name: 'rolls',
        path: 'roll',
        imagePath: 'category.jpg'
      },
      name: 'roll',
      path: 'product',
      description: 'qqq',
      weight: '0.33',
      price: 10.99,
      imagePath: 'product.jpg',
      count: 2
    };
    const updatedProduct: IProductResponse = { ...product, count: 3 };

    spyOn(localStorage, 'setItem');
    spyOn(orderService.changeBasket, 'next');

    component.productCount(product, true);

    expect(product.count).toEqual(updatedProduct.count);
    expect(localStorage.setItem).toHaveBeenCalledWith('basket', JSON.stringify(component.baskets));
    expect(orderService.changeBasket.next).toHaveBeenCalledWith(true);
  });


  it('should not decrease product count if count is already 1', () => {
    const product: IProductResponse = {
      id: '1',
      category: {
        id: '2',
        name: 'rolls',
        path: 'roll',
        imagePath: 'category.jpg'
      },
      name: 'roll',
      path: 'product',
      description: 'qqq',
      weight: '0.33',
      price: 10.99,
      imagePath: 'product.jpg',
      count: 2
    };

    spyOn(localStorage, 'setItem');
    spyOn(orderService.changeBasket, 'next');

    component.productCount(product, false);

    expect(product.count).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('basket', JSON.stringify(component.baskets));
    expect(orderService.changeBasket.next).toHaveBeenCalledWith(true);
  });


  it('should delete a product from the basket', () => {
    const product: IProductResponse = {
      id: '1',
      category: {
        id: '2',
        name: 'rolls',
        path: 'roll',
        imagePath: 'category.jpg'
      },
      name: 'roll',
      path: 'product',
      description: 'qqq',
      weight: '0.33',
      price: 10.99,
      imagePath: 'product.jpg',
      count: 2
    };

    spyOn(localStorage, 'setItem');
    spyOn(orderService.changeBasket, 'next');

    component.baskets = [product];

    component.deleteBasketProduct(product);

    expect(component.baskets.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledWith('basket', JSON.stringify(component.baskets));
    expect(orderService.changeBasket.next).toHaveBeenCalledWith(true);
  });



});
