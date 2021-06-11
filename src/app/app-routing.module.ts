import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guard/auth.guard';

const routes: Routes = [
  {
    path: 'signup',
    pathMatch: "full",
    loadChildren: () => import("./module/signup/signup.module").then(m => m.SignupModule)
  },
  {
    path: 'login',
    pathMatch: "full",
    loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'products',
    pathMatch: "full",
    loadChildren: () => import('./module/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'product-creator',
    pathMatch: "full",
    loadChildren: () => import('./module/product-creator/product-creator.module').then(m => m.ProductCreatorModule)
  },
  {
    path: 'product/:productId',
    pathMatch: "full",
    loadChildren: () => import('./module/product/product.module').then(m => m.ProductModule)
  },
  {
    path:
      'cart/:cartId',
    pathMatch: "full",
    loadChildren: () => import('./module/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'wishlist/:wishListId',
    pathMatch: "full",
    loadChildren: () => import('./module/wishlist/wishlist.module').then(m => m.WishlistModule)
  },
  {
    path: 'checkout/:cartId',
    pathMatch: "full",
    loadChildren: () => import('./module/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'payment/:cartId',
    pathMatch: "full",
    loadChildren: () => import('./module/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'purchases/:username',
    pathMatch: "full",
    loadChildren: () => import('./module/purchases/purchases.module').then(m => m.PurchasesModule)
  },
  {
    path: 'account/:username',
    pathMatch: "full",
    loadChildren: () => import('./module/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'address-creator/:username',
    pathMatch: "full",
    loadChildren: () => import('./module/address-creator/address-creator.module').then(m => m.AddressCreatorModule)
  },
  {
    path: 'address/:username',
    pathMatch: "full",
    loadChildren: () => import('./module/address/address.module').then(m => m.AddressModule)
  },
  {
    path: 'page-notfound',
    pathMatch: "full",
    loadChildren: () => import('./module/page-notfound/page-notfound.module').then(m => m.PageNotfoundModule)
  },

  { path: "**", redirectTo: "page-notfound", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
