import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '@module/shared/shared.module';
import { TaskbarModule } from '@module/taskbar/taskbar.module';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
