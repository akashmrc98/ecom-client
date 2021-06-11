import { NgModule } from '@angular/core';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { SharedModule } from 'shared/shared.module';
import { PurchasesComponent } from './purchases.component';
import { TaskbarModule } from 'component/taskbar/taskbar.module';
import { ReviewCreatorComponent } from './dialogs/review-creator/review-creator.component';
import { ImageViewerModule } from 'pipe/image-viewer/image-viewer.module';

@NgModule({
  declarations: [PurchasesComponent, ReviewCreatorComponent],
  imports: [
    SharedModule,
    TaskbarModule,
    ImageViewerModule,
    PurchasesRoutingModule
  ],
})
export class PurchasesModule { }
