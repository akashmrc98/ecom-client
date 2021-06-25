import { NgModule } from '@angular/core';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { SharedModule } from 'shared/shared.module';
import { TaskbarModule } from 'component/taskbar/taskbar.module';


@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
