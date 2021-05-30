import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from '@module/shared/shared.module';
import { TaskbarModule } from '@module/taskbar/taskbar.module';
import { ReviewModule } from '@module/review/review.module';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    ReviewModule,
    ProductRoutingModule
  ],
  providers: []
})
export class ProductModule { }
