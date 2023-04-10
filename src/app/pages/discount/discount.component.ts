import { Component, OnInit } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interface/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit{

  public userDiscounts: Array <IDiscountResponse> = [];


  constructor(private discountService: DiscountService) {}

  ngOnInit(): void {
    this.getDiscount();
  
  }

  getDiscount():void{
    this.discountService.getAll().subscribe(date =>{
      this.userDiscounts = date;
    })
  }
}
