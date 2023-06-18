import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPersonalComponent } from './order-personal.component';

describe('OrderPersonalComponent', () => {
  let component: OrderPersonalComponent;
  let fixture: ComponentFixture<OrderPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
