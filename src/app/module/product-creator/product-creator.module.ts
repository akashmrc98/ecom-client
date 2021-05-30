import { NgModule } from '@angular/core';

import { ProductCreatorRoutingModule } from './product-creator-routing.module';
import { SharedModule } from '@module/shared/shared.module';
import { TaskbarModule } from '@module/taskbar/taskbar.module';
import { RecentProductsModule } from '@module/recent-products/recent-products.module';
import { ProductCreatorComponent } from './product-creator.component';

@NgModule({
  declarations: [ProductCreatorComponent],
  imports: [
    SharedModule,
    TaskbarModule,
    RecentProductsModule,
    ProductCreatorRoutingModule
  ],
})
export class ProductCreatorModule { }
