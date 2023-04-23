import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info/product-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AboutComponent } from './pages/about/about.component';
import { OffertaComponent } from './pages/offerta/offerta.component';
import { CheckautComponent } from './pages/checkaut/checkaut.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminOrdensComponent } from './admin/admin-ordens/admin-ordens.component';
import { DiscountInfoResolver } from './shared/services/discount/discount-info.resolver';
import { ProductInfoResolver } from './shared/services/product/product-info.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'discount', component: DiscountComponent},
  { path: 'discount/:id', component: DiscountInfoComponent,
    resolve:{ discountInfo: DiscountInfoResolver }  },
  { path: 'product/:category', component: ProductComponent},
  { path: 'product/:category/:id', component: ProductInfoComponent,
  resolve:{
      productInfo: ProductInfoResolver
  } },
  { path: 'delivery', component: DeliveryComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'about', component: AboutComponent},
  { path: 'offerta', component: OffertaComponent},
  { path: 'checkaut', component: CheckautComponent},
  { path: 'admin', component: AdminComponent, children: [
    { path: 'category', component: AdminCategoryComponent},
    { path: 'product', component: AdminProductComponent},
    { path: 'discount', component: AdminDiscountComponent},
    { path: 'news', component: AdminNewsComponent},
    { path: 'order', component: AdminOrdensComponent},
    { path: '', pathMatch: 'full', redirectTo: 'category'}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
