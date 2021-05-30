import { Component, Input, OnInit } from '@angular/core';
import { Review } from '@model/domain/review.model';
import { ReviewService } from '@service/review/review.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

  constructor(private reviewService: ReviewService) { }
  @Input() reviews: Review[];
  @Input() totalReviews: number;

  averageRatings() {
    let averageRatings: number = 0;
    this.reviews.forEach(review => averageRatings += review.rating)
    averageRatings /= parseFloat(this.totalReviews.toPrecision(12));
    return parseFloat(averageRatings.toFixed(2))
  }

  likeReview(reviewId: number) {
    this.reviewService.likeReview(reviewId).subscribe()
  }

  findPercentageOfReviews(star: number): number {
    let percentage: number = 0;
    this.reviews.forEach(review => {
      if (review.rating === star)
        percentage += 1
    })
    percentage /= this.totalReviews
    percentage *= 100;
    percentage = parseFloat(percentage.toFixed(2))
    return percentage
  }

}
