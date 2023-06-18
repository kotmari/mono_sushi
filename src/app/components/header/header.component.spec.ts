import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { IProductResponse } from "../../shared/interface/product/product.interface";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const FAKE_BASKET: IProductResponse[] = [
    {
      id:'1',
      category:{
        id: '2',
        name: 'www',
        path: 'string',
        imagePath: 'string'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: 'string',
      price: 10,
      imagePath: 'string',
      count: 2,
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should changeTotal', () => {
    component.baskets = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20);
    component.baskets = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });
  it('it should changeCountTotal', () =>{
    component.baskets = FAKE_BASKET;
    spyOn(component, 'getCountTotal').and.callThrough();
    component.getCountTotal();
    expect(component.getCountTotal).toHaveBeenCalled();
    expect(component.count).toBe(2);
  })
});
