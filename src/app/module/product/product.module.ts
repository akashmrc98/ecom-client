import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { SharedModule } from 'shared/shared.module';
import { TaskbarModule } from 'component/taskbar/taskbar.module';
import { ReviewModule } from 'component/review/review.module';
import { ImageViewerModule } from 'pipe/image-viewer/image-viewer.module';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    ImageViewerModule,
    ReviewModule,
    ProductRoutingModule
  ],
  providers: []
})
export class ProductModule { }
