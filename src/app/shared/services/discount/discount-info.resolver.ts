// import { Injectable } from '@angular/core';
// import {
//   Resolve,
//   RouterStateSnapshot,
//   ActivatedRouteSnapshot
// } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { IDiscountResponse } from '../../interface/discount/discount.interface';
// import { DiscountService } from './discount.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class DiscountInfoResolver implements Resolve<IDiscountResponse> {

//   constructor(private discounService: DiscountService){}


//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiscountResponse> {
//     return this.discounService.getOne(Number(route.paramMap.get('id')));
//   }
// }

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DiscountService } from './discount.service';
import { IDiscountResponse } from '../../interface/discount/discount.interface';

@Injectable({
  providedIn: 'root'
})
export class DiscountInfoResolver implements Resolve<IDiscountResponse> {

  constructor(private discountService: DiscountService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiscountResponse> {
    const id = Number(route.paramMap.get('id'));
    return this.discountService.getOne(id);
  }
}

