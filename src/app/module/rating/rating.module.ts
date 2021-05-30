import { NgModule } from '@angular/core';
import { RatingComponent } from './rating.component';
import { SharedModule } from '@module/shared/shared.module';

@NgModule({
  declarations: [RatingComponent],
  imports: [
    SharedModule
  ],
  exports: [RatingComponent]
})
export class RatingModule { }
