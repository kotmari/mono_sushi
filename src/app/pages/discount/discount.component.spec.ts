import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DiscountComponent } from './discount.component';
import { DiscountService } from '../../shared/services/discount/discount.service';

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;
  let discountService: DiscountService;

  // Declare the fakeDiscounts variable here
  const fakeDiscounts = [
    { id: 1, name: 'Discount 1', title: 'test', description: 'test', imagePath: 'test.j' },
    { id: 2, name: 'Discount 2', title: 'test', description: 'test', imagePath: 'test.j' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscountComponent],
      imports: [HttpClientTestingModule],
      providers: [DiscountService],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;

    // Get the instance of the DiscountService
    discountService = TestBed.inject(DiscountService);

    // Spy on the getAll method and return a fake observable
    spyOn(discountService, 'getAll').and.returnValue(of(fakeDiscounts));

    // Trigger ngOnInit to initialize the component
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user discounts', () => {
    // Check if userDiscounts property is assigned with the fake discounts
    component.getDiscount();
    expect(component.userDiscounts).toEqual(fakeDiscounts);
  });
});



