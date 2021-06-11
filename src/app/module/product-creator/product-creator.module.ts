import { NgModule } from '@angular/core';

import { ProductCreatorRoutingModule } from './product-creator-routing.module';
import { SharedModule } from 'shared/shared.module';
import { TaskbarModule } from 'component/taskbar/taskbar.module';
import { RecentProductsModule } from 'component/recent-products/recent-products.module';
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
