import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ICategoryRequst, ICategoryResponse } from '../../interface/category/categori.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL;
  private api = {categories: `${this.url}/categories`}

  constructor(
    private http: HttpClient
  ) { }
  
  getAll(): Observable<ICategoryResponse[]>{
    return this.http.get<ICategoryResponse[]>(this.api.categories)
  }

  create(category: ICategoryRequst): Observable<ICategoryResponse>{
    return this.http.post<ICategoryResponse>(this.api.categories, category);
  }

  update(category: ICategoryRequst, id: number): Observable<ICategoryResponse>{
    return this.http.patch<ICategoryResponse>(`${this.api.categories}/${id}`, category);
  }

  delete(id: number): Observable<ICategoryResponse>{
    return this.http.delete<ICategoryResponse>(`${this.api.categories}/${id}`);
  }


}
