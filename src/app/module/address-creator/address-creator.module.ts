import { NgModule } from '@angular/core';

import { AddressCreatorRoutingModule } from './address-creator-routing.module';
import { AddressCreatorComponent } from './address-creator.component';
import { SharedModule } from '@module/shared/shared.module';
import { TaskbarModule } from '@module/taskbar/taskbar.module';
import { SaveComponent } from './dialogs/save/save.component';

@NgModule({
  declarations: [
    AddressCreatorComponent,
    SaveComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    AddressCreatorRoutingModule
  ]
})
export class AddressCreatorModule { }
