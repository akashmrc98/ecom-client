import { NgModule } from '@angular/core';
import { RatingModule } from 'component/rating/rating.module';
import { SharedModule } from 'shared/shared.module';
import { ReviewLikesPipe } from 'pipe/review-like/review-likes.pipe';
import { ReviewComponent } from './review.component';

@NgModule({
  declarations: [
    ReviewComponent,
    ReviewLikesPipe
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
