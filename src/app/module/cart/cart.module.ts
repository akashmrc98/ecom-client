import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SharedModule } from 'shared/shared.module';

import { TaskbarModule } from 'component/taskbar/taskbar.module';
import * as fromCartReducer from '@store/cart/cart.reducer'
import { StoreModule } from '@ngrx/store';
import { ImageViewerModule } from 'pipe/image-viewer/image-viewer.module';
import { ConfirmComponent } from './dialog/confirm/confirm.component';

@NgModule({
  declarations: [
    CartComponent,
    ConfirmComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    ImageViewerModule,
    CartRoutingModule,
    StoreModule.forFeature(fromCartReducer.key, fromCartReducer.cartReducer)
  ],
  providers: []
})
export class CartModule { }
