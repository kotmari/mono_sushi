import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Storage} from "@angular/fire/storage";
import {AccountService} from "../../shared/services/account/account.service";
import {IOrderResponse} from "../../shared/interface/order/order.interface";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-checkaut',
  templateUrl: './checkaut.component.html',
  styleUrls: ['./checkaut.component.scss']
})
export class CheckautComponent implements  OnInit{

  public checkouts: Array<IProductResponse> = [];
  public ordersClient: Array<IOrderResponse> = [];

  public orderForm!: FormGroup;
  private user: any;
  public total = 0;
  


  constructor(
    private accountService: AccountService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCheckout();
    this.loadOrders();
    this.updateCheckout();
    this.initClientForm();
    this.ordersDataUser();
    }

  loadCheckout(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
    this.checkouts = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  loadOrders():void{
    this.orderService.getAllFirebase().subscribe((data) => {
      this.ordersClient = data as IOrderResponse[];
    })
  }


  getTotalPrice(): void {
    this.total = this.checkouts.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }


  updateCheckout(): void {
    this.orderService.changeBasket.subscribe(()=>{
      this.loadCheckout();
    })
  }

  productCount(checkout: IProductResponse, value: boolean): void{
    if(value){
      ++checkout.count;
      localStorage.setItem('basket', JSON.stringify(this.checkouts))
    }else if (!value && checkout.count > 1){
      --checkout.count;
      localStorage.setItem('basket', JSON.stringify(this.checkouts));
    }
    this.updateCheckout();
    this.orderService.changeBasket.next(true);
  }
  deleteCheckoutProduct(checkout: IProductResponse): void{
    if (this.checkouts.some((prod) => prod.id === checkout.id)) {
      const index = this.checkouts.findIndex(
        (prod) => prod.id === checkout.id
      );
      this.checkouts.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.checkouts));
      this.updateCheckout();
      this.orderService.changeBasket.next(true);
    }
  }

  initClientForm(){
    this.orderForm = this.fb.group({
      orderProduct: [JSON.stringify(this.checkouts)],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      countDevices: [null, Validators.required],
      devices: [null, Validators.required],
      cash: [null, Validators.required],
      delivery: [null, Validators.required],
      data: [String(new Date())],
      status:['в процесі'],
      call: [null, Validators.required],
    });

 }

  ordersDataUser() {
    const userExists = localStorage.getItem('currentUser');
    const { firstName, lastName, phone, address, countDevices,devices, cash, delivery, call } = this.orderForm.value;

    if (userExists) {
      // Якщо є зареєстрований користувач
      this.user = JSON.parse(userExists);
      this.orderForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phone: this.user.phoneNumber,
        address: this.user.address,
        id: this.user.uid,
        countDevices,
        devices,
        cash,
        delivery,
        call
      });


    } else {
      const ordersData = {
        firstName,
        lastName,
        phone,
        address,
        countDevices,
        devices,
        cash,
        delivery,
        call
    };
    }
  }


  ordersData() {
    const orderData = this.orderForm.value;
    this.orderService.createFirebase(orderData)
      .then(() => {
        this.toastr.success('Orders successfully created');
        this.updateUserOrder();
        this.clearBasket();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  updateUserOrder(){
    const userExists = localStorage.getItem('currentUser');
    if (userExists) {
    const orders = [JSON.stringify(this.checkouts)]
     const user = JSON.parse(userExists);
     const userId = user.uid;
     this.accountService.updateUserOrders(userId, orders)
     .then(() => {
      this.toastr.success('Orders successfully created');
     })
     .catch((error) => {
      console.error('Failed to update user orders:', error);
    });
    }
  }

  clearBasket(): void {
    this.checkouts = [];
    localStorage.setItem('basket', JSON.stringify(this.checkouts));
    this.updateCheckout();
    this.orderService.changeBasket.next(true);
    this.orderForm.reset();
    localStorage.removeItem('basket');

  }
}
