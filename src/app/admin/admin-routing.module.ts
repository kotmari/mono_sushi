import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminOrdensComponent } from './admin-ordens/admin-ordens.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: 'category', component: AdminCategoryComponent},
      { path: 'product', component: AdminProductComponent},
      { path: 'discount', component: AdminDiscountComponent},
      { path: 'news', component: AdminNewsComponent},
      { path: 'order', component: AdminOrdensComponent},
      { path: '', pathMatch: 'full', redirectTo: 'category'}
    ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
