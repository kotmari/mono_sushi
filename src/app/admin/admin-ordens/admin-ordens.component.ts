import {Component, OnInit} from '@angular/core';
import {IOrderResponse} from "../../shared/interface/order/order.interface";
import {OrderService} from "../../shared/services/order/order.service";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../shared/services/product/product.service";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-admin-ordens',
  templateUrl: './admin-ordens.component.html',
  styleUrls: ['./admin-ordens.component.scss']
})
export class AdminOrdensComponent implements OnInit{
  public adminOrders: Array<IOrderResponse> = [];
  public statusChange = false;
  public status = '';

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadOrder()
  }

  loadOrder() {
    this.orderService.getAllFirebase().subscribe((data) => {
      data.forEach((product) => {
        const arr = product['orderProduct'];
        product['orderProduct'] = JSON.parse(arr);
      })
      this.adminOrders = data as IOrderResponse[];

    })
  }

  changeStatus(order: IOrderResponse){
    this.statusChange = !this.statusChange;
    order.status = "Виконано";
    order.orderProduct = JSON.stringify(order.orderProduct) as any,


     this.orderService.updateFirebase(order, order.id)
     .then(() => {
      this.toastr.success('Orders successfully updateOrder');
     })
     .catch((error) => {
      console.error('Failed to update orders:', error);
    });
    
  }


  deleteOrder(order: IOrderResponse):void{
    this.orderService.deleteFirebase(order.id).then(()=>{
      this.loadOrder();
      this.toastr.success('Order successfully deleted');
    })
  }

}
