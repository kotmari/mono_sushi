import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { path: 'discount',
    loadChildren: () => import('./pages/discount/discount.module').then(m => m.DiscountModule)
  },
  { path: 'delivery',
    loadChildren: () => import('./pages/delivery/delivery.module').then(m => m.DeliveryModule)
  },
  { path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then(m => m.PaymentModule)
  },
  { path: 'product/:category',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  { path: 'about',
  loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  { path: 'offerta',
    loadChildren: () => import('./pages/offerta/offerta.module').then(m => m.OffertaModule)
  },
  { path: 'checkaut',
    loadChildren: () => import('./pages/checkaut/checkaut.module').then(m => m.CheckautModule)
  },
  { path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization/authorization.module')
      .then(m => m.AuthorizationModule)
  },
  { path: 'cabinet',
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  { path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
