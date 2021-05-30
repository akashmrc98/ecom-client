import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from '@module/shared/shared.module';
import { TaskbarModule } from '@module/taskbar/taskbar.module';
import { StoreModule } from '@ngrx/store';

import * as fromCartReducer from '@store/cart/cart.reducer'
import * as fromWishListReducer from '@store/wishList/wishlist.reducer'
import { RatingModule } from '@module/rating/rating.module';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    RatingModule,
    ProductsRoutingModule,
    StoreModule.forFeature(fromCartReducer.key, fromCartReducer.cartReducer),
    StoreModule.forFeature(fromWishListReducer.key, fromWishListReducer.wishListReducer)
  ],
})
export class ProductsModule { }