import { NgModule } from '@angular/core';
import { RatingModule } from '@module/rating/rating.module';
import { SharedModule } from '@module/shared/shared.module';
import { ReviewComponent } from './review.component';

@NgModule({
  declarations: [
    ReviewComponent,
  ],
  imports: [
    SharedModule,
    RatingModule
  ],
  exports: [
    ReviewComponent
  ]
})
export class ReviewModule { }
