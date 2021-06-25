import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { SharedModule } from 'shared/shared.module';
import { OrdersComponent } from './orders.component';
import { TaskbarModule } from 'component/taskbar/taskbar.module';
import { ReviewCreatorComponent } from './dialogs/review-creator/review-creator.component';
import { ImageViewerModule } from 'pipe/image-viewer/image-viewer.module';

@NgModule({
  declarations: [OrdersComponent, ReviewCreatorComponent],
  imports: [
    SharedModule,
    TaskbarModule,
    ImageViewerModule,
    OrdersRoutingModule
  ],
})
export class OrdersModule { }
