import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AboutComponent } from './pages/about/about.component';
import { OffertaComponent } from './pages/offerta/offerta.component';
import { CheckautComponent } from './pages/checkaut/checkaut.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminOrdensComponent } from './admin/admin-ordens/admin-ordens.component';
import { AdminComponent } from './admin/admin.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { ProductInfoComponent } from './pages/product-info/product-info/product-info.component';
import { AuthorizationComponent } from './pages/authorization/authorization/authorization.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DiscountComponent,
    DiscountInfoComponent,
    ProductComponent,
    DeliveryComponent,
    PaymentComponent,
    AboutComponent,
    OffertaComponent,
    CheckautComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminNewsComponent,
    AdminOrdensComponent,
    AdminComponent,
    ProductInfoComponent,
    AuthorizationComponent,
    CabinetComponent,
    AuthDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
