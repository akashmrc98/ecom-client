import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { TaskbarModule } from 'component/taskbar/taskbar.module';
import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';

@NgModule({
  declarations: [AddressComponent],
  imports: [
    SharedModule,
    TaskbarModule,
    AddressRoutingModule
  ],
})
export class AddressModule { }
