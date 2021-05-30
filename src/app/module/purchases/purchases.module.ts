import { NgModule } from '@angular/core';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { SharedModule } from '@module/shared/shared.module';
import { PurchasesComponent } from './purchases.component';
import { TaskbarModule } from '@module/taskbar/taskbar.module';
import { ReviewCreatorComponent } from './dialogs/review-creator/review-creator.component';

@NgModule({
  declarations: [PurchasesComponent, ReviewCreatorComponent],
  imports: [
    SharedModule,
    TaskbarModule,
    PurchasesRoutingModule
  ],
})
export class PurchasesModule { }
