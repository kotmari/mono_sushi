import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IProductRequest, IProductResponse } from "../../interface/product/product.interface";
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
      },
    ];
    service.getAll().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should getOne a product by ID', () => {
    const productId = 1;
    const mockProduct: IProductResponse = {
      id: productId,
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

    service.getOne(productId).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should create a product', () => {
    const product: IProductRequest = {
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

    const mockProduct: IProductResponse = {
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

    service.create(product).subscribe(response => {
      expect(response).toEqual(mockProduct);
    });
    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);
    req.flush(mockProduct);
  });

  it('should update a product', () => {
    const productId = 1;
    const mockProduct: IProductResponse = {
      id: productId,
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

    service.update(mockProduct, productId).subscribe(product => {
      expect(product.name).toEqual(mockProduct.name);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products/${productId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProduct);
  });




  it('should delete a product', () => {
    const productId = 1;

    service.delete(productId).subscribe(product => {
      expect(product.id).toEqual(productId);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ id: productId });
  });

  it('should get all products by category', () => {
    const categoryName = 'rolls';
    const mockProducts: IProductResponse[] = [
      {
        id: 1,
        category: {
          id: 2,
          name: 'rolls',
          path: 'roll',
          imagePath: 'category.jpg'
        },
        name: 'roll1',
        path: 'product1',
        description: 'description1',
        weight: '0.33',
        price: 10.99,
        imagePath: 'product1.jpg',
        count: 5
      },
      {
        id: 2,
        category: {
          id: 2,
          name: 'rolls',
          path: 'roll',
          imagePath: 'category.jpg'
        },
        name: 'roll2',
        path: 'product2',
        description: 'description2',
        weight: '0.5',
        price: 15.99,
        imagePath: 'product2.jpg',
        count: 3
      },
    ];

    service.getAllByCategory(categoryName).subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/products?category.path=${categoryName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });






});
