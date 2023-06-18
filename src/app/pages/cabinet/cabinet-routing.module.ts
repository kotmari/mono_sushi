import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { AboutUserComponent } from './about-user/about-user.component';
import { OrderPersonalComponent } from './order-personal/order-personal.component';
import { PasswordChangeComponent } from './password-change/password-change.component';



const routes: Routes = [
  { path: '', component: CabinetComponent, children: [
      { path: 'about-user', component: AboutUserComponent},
      { path: 'order-personal', component: OrderPersonalComponent},
      { path: 'password-change', component: PasswordChangeComponent},
      { path: '', pathMatch: 'full', redirectTo: 'cabinet'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
