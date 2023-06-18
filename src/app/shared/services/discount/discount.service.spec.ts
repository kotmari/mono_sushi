import { TestBed } from '@angular/core/testing';

import { DiscountService } from './discount.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from "../../../../environments/environment";
import { IDiscountRequest, IDiscountResponse } from '../../interface/discount/discount.interface';


describe('DiscountService', () => {
  let service: DiscountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        DiscountService
      ]
    });
    service = TestBed.inject(DiscountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAll discount', () => {
    const mockDiscounts: IDiscountResponse [] = [
      { id: '1', name: '3+1', title: 'test', description: 'test', imagePath: 'test.jpg'},
      { id: '2', name: '50%',  title: 'test', description: 'test', imagePath: 'test.jpg'}
    ];
    service.getAllFirebase().subscribe(discounts => {
      expect(discounts).toEqual(mockDiscounts);
    });
    const req = httpMock.expectOne(`${environment.BACKEND_URL}/discounts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDiscounts);
  });

  it('should getOne a discount by ID', () => {
    const discountId = '1';
    const mockDiscount: IDiscountResponse = {
      id: discountId,
      name: 'test',
      title: 'test',
      description: 'test',
      imagePath: 'test.jpg'
    };

    service.getOneFirebase(discountId).subscribe(discount => {
      expect(discount).toEqual(mockDiscount);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/discounts/${discountId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDiscount);
  });

  // it('should create a discount', () => {
  //   const discount: IDiscountRequest = {
  //     name: 'test',
  //     title: 'test',
  //     description: 'test',
  //     imagePath: 'test.jpg'
  //   };
  //   const mockDiscount: IDiscountResponse = {
  //     id: '1',
  //     name: 'test',
  //     title: 'test',
  //     description: 'test',
  //     imagePath: 'test.jpg'
  //   };
  //
  //   service.createFirebase(discount).subscribe(response => {
  //     expect(response).toEqual(mockDiscount);
  //   });
  //   const req = httpMock.expectOne(`${environment.BACKEND_URL}/discounts`);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual(discount);
  //   req.flush(mockDiscount);
  //
  // });

  // it('should update a discount', () => {
  //   const discountId = '1';
  //   const mockDiscount: IDiscountRequest = {
  //     name: 'test',
  //     title: 'test',
  //     description: 'test',
  //     imagePath: 'test.jpg' };
  //
  //   service.update(mockDiscount, discountId).subscribe(discount => {
  //     expect(discount.name).toEqual(mockDiscount.name);
  //   });
  //
  //   const req = httpMock.expectOne(`${environment.BACKEND_URL}/discounts/${discountId}`);
  //   expect(req.request.method).toBe('PATCH');
  //   req.flush(mockDiscount);
  // });
  //
  //
  //
  //
  // it('should delete a discount', () => {
  //   const discountId = '1';
  //
  //   service.delete(discountId).subscribe(discount => {
  //     expect(discount.id).toEqual(discountId);
  //   });
  //
  //   const req = httpMock.expectOne(`${environment.BACKEND_URL}/discounts/${discountId}`);
  //   expect(req.request.method).toBe('DELETE');
  //   req.flush({ id: discountId });
  // });

});
