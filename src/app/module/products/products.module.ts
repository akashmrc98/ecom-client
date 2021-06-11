import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'shared/shared.module';
import { TaskbarModule } from 'component/taskbar/taskbar.module';
import { StoreModule } from '@ngrx/store';

import * as fromCartReducer from '@store/cart/cart.reducer'
import * as fromWishListReducer from '@store/wishList/wishlist.reducer'
import * as fromProductReducer from '@store/product/product.reducer'

import { RatingModule } from 'component/rating/rating.module';
import { ImageViewerModule } from 'pipe/image-viewer/image-viewer.module';
import { PaginatorModule } from 'component/paginator/paginator.module';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    RatingModule,
    ImageViewerModule,
    PaginatorModule,
    ProductsRoutingModule,
    StoreModule.forFeature(fromCartReducer.key, fromCartReducer.cartReducer),
    StoreModule.forFeature(fromWishListReducer.key, fromWishListReducer.wishListReducer),
    StoreModule.forFeature(fromProductReducer.key, fromProductReducer.productReducer),
  ],
})
export class ProductsModule { }