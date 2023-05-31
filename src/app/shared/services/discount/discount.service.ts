import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDiscountRequest, IDiscountResponse } from '../../interface/discount/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private url = environment.BACKEND_URL;
  private api = { discounts: `${this.url}/discounts`};

  constructor( private http: HttpClient) { }


  getAll(): Observable<IDiscountResponse[]> {
    return this.http.get<IDiscountResponse[]>(this.api.discounts);
  }
  getOne(id: number): Observable<IDiscountResponse>{
    return this.http.get<IDiscountResponse>(`${this.api.discounts}/${id}`)
  }

  create(discount: IDiscountRequest): Observable <IDiscountResponse>{
    return this.http.post<IDiscountResponse>(this.api.discounts, discount);
  }

  update(discount: IDiscountRequest, id: number): Observable <IDiscountResponse>{
    return this.http.patch<IDiscountResponse> (`${this.api.discounts}/${id}`, discount)
  }

  delete(id: number): Observable<IDiscountResponse>{
    return this.http.delete<IDiscountResponse>(`${this.api.discounts}/${id}`)
  }




}
