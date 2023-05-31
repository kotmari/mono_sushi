import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../shared/services/product/product.service';
import {IProductResponse} from "../../shared/interface/product/product.interface";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let productService: ProductService;
  let fixture: ComponentFixture<ProductComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [ProductService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should increase product count when value is true', () => {
    const product: IProductResponse = {
      id: 1,
      category: {
        id: 2,
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
    };
    component.productCount(product, true);
    expect(product.count).toEqual(6);
  });

  it('should decrease product count when value is false and count is greater than 1', () => {
    const product: IProductResponse = {
      id: 1,
      category: {
        id: 2,
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
    };
    component.productCount(product, false);
    expect(product.count).toEqual(4);
  });

  it('should not decrease product count when value is false and count is 1', () => {
    const product: IProductResponse = {
      id: 1,
      category: {
        id: 2,
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
    };
    component.productCount(product, false);
    fixture.detectChanges();
    expect(product.count).toEqual(1);
  });
});
