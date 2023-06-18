import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable} from 'rxjs';
import { DiscountService } from './discount.service';
import { IDiscountResponse } from '../../interface/discount/discount.interface';
import { DocumentData } from "@firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class DiscountInfoResolver implements Resolve<IDiscountResponse> {

  constructor(private discountService: DiscountService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiscountResponse> {
    const id = route.paramMap.get('id');
    return this.discountService.getOneFirebase(id as string).pipe(
      map((data: DocumentData) => {
        const discountResponse: IDiscountResponse = {
          id: data.toString(),
          name: data.toString(),
          title: data.toString(),
          description: data.toString(),
          imagePath: data.toString(),
        };
        return discountResponse;
      })
    );
  }



}

