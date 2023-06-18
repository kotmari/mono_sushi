import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckautComponent } from './checkaut.component';
import { CheckautRoutingModule } from './checkaut-routing.module';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    CheckautComponent
  ],
  imports: [
    CommonModule,
    CheckautRoutingModule,
    SharedModule,

  ]
})
export class CheckautModule { }
