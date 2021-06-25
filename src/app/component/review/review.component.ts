import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Review } from '@model/domain/review.model';
import { CommonService } from '@service/common/common.service';
import { ReviewService } from '@service/review/review.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {

  constructor(
    private reviewService: ReviewService,
    private _snackBar: MatSnackBar,
    private commonService: CommonService
  ) { }

  @Input() reviews: Review[] = [];
  @Input() totalReviews: number = 0;

  averageRatings() {
    return this.commonService.getAverageRatings(this.reviews)
  }

  roundAverageRatings(){
    return Math.round(this.averageRatings())
  }

  likeReview(reviewId: number) {
    this.reviewService.likeReview(reviewId).subscribe(
      (next) => {
        this._snackBar.open("You Liked this review!", 'close')
      },
      (error) => {
        this._snackBar.open("You already Liked this review!", 'close')
      }
    )
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
