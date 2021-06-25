import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '@model/domain/review.model';
import { ReviewDTO } from '@model/dto/review.dto';
import { REVIEW_API, userId, username } from 'config/http.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  saveReview(reviewDto: ReviewDTO, orderId:number, index:number) {
    return this.http.post(REVIEW_API + `/products/${reviewDto.productId}/${orderId}/${index}`, reviewDto)
  }

  likeReview(reviewId: number) {
    const data = {
      reviewId:reviewId,
      userId:userId
    }
  console.log(reviewId, userId)
    return this.http.post(REVIEW_API + "/up-vote/", data)
  }

  getReviewsByProductId(productId: number) :Observable<Review[]> {
    return this.http.get<Review[]>(REVIEW_API + `/products/${productId}`)
  }

  getReviewLikes(reviewId: number): Observable<number> {
    return this.http.get<number>(REVIEW_API + "/likes/" + reviewId)
  }



}
