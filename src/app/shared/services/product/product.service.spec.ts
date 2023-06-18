import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProductResponse } from "../../interface/product/product.interface";
import { environment } from "../../../../environments/environment";




describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductService
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all products', () => {
    const mockProducts: IProductResponse[] = [
      {
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
        count: 5
      },
    ];
    service.getAllFirebase().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should getOne a product by ID', () => {
    const productId = '1';
    const mockProduct: IProductResponse = {
      id: productId,
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
      count: 5
    };

    service.getOneFirebase(productId).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });


});
