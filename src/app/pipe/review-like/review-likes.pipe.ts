import { Pipe, PipeTransform } from '@angular/core';
import { ReviewService } from '@service/review/review.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'reviewLikes'
})
export class ReviewLikesPipe implements PipeTransform {

  constructor(private reviewService: ReviewService) { }

  transform(reviewLikesId: number): Observable<number> {
    return this.reviewService.getReviewLikes(reviewLikesId);
  }

}
