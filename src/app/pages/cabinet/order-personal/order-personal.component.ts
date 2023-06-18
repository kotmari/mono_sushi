import { Component, OnInit } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { IRegisterWithExtra } from 'src/app/shared/interface/login/registr.interface';
import { IOrderResponse } from 'src/app/shared/interface/order/order.interface';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';


@Component({
  selector: 'app-order-personal',
  templateUrl: './order-personal.component.html',
  styleUrls: ['./order-personal.component.scss']
})
export class OrderPersonalComponent implements OnInit {

  public ordersHistory: Array<IProductResponse> = [];
  public user!: string;
  
  
  
  constructor(
    private accountService: AccountService,

  ) {}

  ngOnInit() {
    this.loadOrder()
  }



  //  чомусь замовлення перезаписуються (видає останнє)
  loadOrder() {
    const userExists = localStorage.getItem('currentUser');
   if (userExists) {
    const user = JSON.parse(userExists);
    const userId = user.uid;
    console.log(userId);
    this.accountService.getOneUserFirebase(userId).subscribe((data) => {
      const arr = data['orders'];
      data['orders'] = JSON.parse(arr);
       this.ordersHistory = data['orders'];
       console.log(this.ordersHistory)
      })
    }
  }





}    





