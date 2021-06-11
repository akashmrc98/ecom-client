import { NgModule } from '@angular/core';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';
import { SharedModule } from 'shared/shared.module';
import { TaskbarModule } from 'component/taskbar/taskbar.module';
import * as fromCartReducer from '@store/cart/cart.reducer'
import * as fromWishListReducer from '@store/wishList/wishlist.reducer'
import { StoreModule } from '@ngrx/store';
import { ImageViewerModule } from 'pipe/image-viewer/image-viewer.module';


@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    ImageViewerModule,
    WishlistRoutingModule,
    StoreModule.forFeature(fromWishListReducer.key, fromWishListReducer.wishListReducer),
    StoreModule.forFeature(fromCartReducer.key, fromCartReducer.cartReducer)
  ]
})
export class WishlistModule { }
