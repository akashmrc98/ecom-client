import { NgModule } from '@angular/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { SharedModule } from '@module/shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    SharedModule,
    SignupRoutingModule
  ],
})
export class SignupModule { }
