import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CabinetComponent } from './cabinet.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { OrderPersonalComponent } from './order-personal/order-personal.component';
import { AboutUserComponent } from './about-user/about-user.component';



@NgModule({
  declarations: [
    CabinetComponent,
    PasswordChangeComponent,
    OrderPersonalComponent,
    AboutUserComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }
