import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/constants/constant';
import { IProductResponse } from 'src/app/shared/interface/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Router } from '@angular/router';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { ICategoryResponse } from '../../shared/interface/category/categori.interface';
import { CategoryService } from '../../shared/services/category/category.service';
import { PhoneDialogComponent } from '../phone-dialog/phone-dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  OnInit{


  public baskets: Array<IProductResponse> = [];
  public navCategory: Array<ICategoryResponse>=[];
  public total = 0;
  public count = 0;
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loadNavCategory();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();

  }

  loadNavCategory():void{
    this.categoryService.getAll().subscribe((data) => {
      this.navCategory = data;
    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
    this. baskets = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getCountTotal();
  }

  getTotalPrice(): void {
    this.total = this.baskets.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }

  getCountTotal(): void {
    this.count = this.baskets.reduce(
      (count: number, prod: IProductResponse) =>
        count + prod.count,
      0
    );
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(()=>{
      this.loadBasket();
    })
  }

  checkUserLogin(): void{
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN){
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    }else{
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }


  checkUpdatesUserLogin(): void{
    this.accountService.isUserLogin$.subscribe(() =>{
      this.checkUserLogin();
    })
  }

  openDialog(): void{
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    });
  }

  openDialogBasket(): void {
    const dialogConfig = new MatDialogConfig();
    const position: DialogPosition = {
      top: '95px',
      right: '0'
    };
    dialogConfig.position = position;
    dialogConfig.backdropClass = 'dialog-back';
    dialogConfig.panelClass = 'basket-dialog';
    dialogConfig.autoFocus = false;
    this.dialog.open(BasketDialogComponent, dialogConfig);
  }

  openPhoneDialog() {
    const dialogRef = this.dialog.open(PhoneDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }
  }
