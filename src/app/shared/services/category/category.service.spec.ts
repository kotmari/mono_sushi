import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICategoryRequest, ICategoryResponse } from '../../interface/category/categori.interface';
import { environment } from "../../../../environments/environment";

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve categories', () => {
    const mockCategories: ICategoryResponse[] = [
      { id: 1, name: 'rolls', path:'test', imagePath: 'test.jpg'},
      { id: 2, name: 'sets',  path:'test', imagePath: 'test.jpg'}
    ];
    service.getAll().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });
    const req = httpMock.expectOne(`${environment.BACKEND_URL}/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should create a category', () => {
    const category: ICategoryRequest = {
      name: 'test',
      path: 'test',
      imagePath: 'test.jpg'
    };
    const mockCategory: ICategoryResponse = {
      id: 1,
      name: 'test',
      path: 'test',
      imagePath: 'test.jpg'
    };

    service.create(category).subscribe(response => {
      expect(response).toEqual(mockCategory);
    });
    const req = httpMock.expectOne(`${environment.BACKEND_URL}/categories`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(category);
    req.flush(mockCategory);

  });

  it('should update a category', () => {
    const categoryId = 1;
    const mockCategory: ICategoryRequest = {
        name: 'test',
        path: 'test',
        imagePath: 'test.jpg' };

    service.update(mockCategory, categoryId).subscribe(category => {
      expect(category.name).toEqual(mockCategory.name);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/categories/${categoryId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockCategory);
  });

  it('should delete a category', () => {
    const categoryId = 1;

    service.delete(categoryId).subscribe(category => {
      expect(category.id).toEqual(categoryId);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_URL}/categories/${categoryId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ id: categoryId });
  });
});
