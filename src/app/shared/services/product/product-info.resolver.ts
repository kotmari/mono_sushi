import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { IProductResponse } from '../../interface/product/product.interface';
import { ProductService } from './product.service';
import { map } from 'rxjs';
import { ICategoryResponse } from '../../interface/category/categori.interface';
import { DocumentData } from "@firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductResponse> {

  constructor(private productServices: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.productServices.getOneFirebase(route.paramMap.get('id')).pipe(
      map((data: DocumentData) => {
        const productResponse: IProductResponse = {
          id: data.toString(),
          category: {} as ICategoryResponse,
          name: data.toString(),
          path: data.toString(),
          description: data.toString(),
          weight: data.toString(),
          price: 0,
          imagePath: data.toString(),
          count: 0
        };
        return productResponse;
      })
    );
  }
}



