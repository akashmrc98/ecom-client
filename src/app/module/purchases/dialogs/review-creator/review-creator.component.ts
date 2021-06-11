import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReviewDTO } from '@model/dto/review.dto';
import { PurchasesComponent } from '@module/purchases/purchases.component';
import { ReviewService } from '@service/review/review.service';
import { username } from 'config/http.config';

@Component({
  selector: 'app-review-creator',
  templateUrl: './review-creator.component.html',
  styleUrls: ['./review-creator.component.scss']
})
export class ReviewCreatorComponent {

  constructor(
    public dialogRef: MatDialogRef<PurchasesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number, close: boolean, confrim: boolean },
    private reviewService: ReviewService
  ) { }

  reviewForm: FormGroup = new FormGroup({
    headLine: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  })

  stars: string[] = ["star_outline", "star_outline", "star_outline", "star_outline", "star_outline"];
  ratings: number = 0
  username: string = username
  reviewDto: ReviewDTO;

  rateProduct(index: number) {
    let stars = [];
    let unratedStars = 4 - index
    let ratings = 0;

    for (let i = 0; i < index + 1; i++) {
      ratings += 1;
      stars.push("star")
    }

    for (let j = 0; j < unratedStars; j++)
      stars.push("star_outline")

    this.ratings = ratings;
    this.stars = stars;
  }

  submitReview() {
    this.reviewDto = {
      ...this.reviewForm.value,
      username: this.username,
      rating: this.ratings,
      productId: this.data.productId
    }

    this.reviewService.saveReview(this.reviewDto)
      .subscribe(
        (next) => {
          this.reviewForm.reset()
        },
        (error) => { console.log(error) }
      )

  }

}
