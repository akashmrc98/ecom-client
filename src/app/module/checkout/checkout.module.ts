import { NgModule } from '@angular/core';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '@module/shared/shared.module';
import { TaskbarModule } from '@module/taskbar/taskbar.module';
import { AddressViewerComponent } from './dialogs/address-viewer/address-viewer.component';
import { ConfirmComponent } from '@module/checkout/dialogs/confirm/confirm.component';

@NgModule({
  declarations: [
    CheckoutComponent,
    AddressViewerComponent,
    ConfirmComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    CheckoutRoutingModule
  ]
})
export class CheckoutModule { }
