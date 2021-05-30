import { NgModule } from '@angular/core';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SharedModule } from '@module/shared/shared.module';

import { TaskbarModule } from '@module/taskbar/taskbar.module';
import * as fromCartReducer from '@store/cart/cart.reducer'
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    CartRoutingModule,
    StoreModule.forFeature(fromCartReducer.key, fromCartReducer.cartReducer)
  ],
  providers: []
})
export class CartModule { }
