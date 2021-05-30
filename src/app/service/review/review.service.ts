import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewDto } from '@model/dtos/review.dto';
import { REVIEW_API, username } from 'config/http.config';

@Injectable({
  providedIn: 'any'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  saveReview(reviewDto: ReviewDto) {
    return this.http.post(REVIEW_API, reviewDto)
  }

  likeReview(reviewId: number) {
    return this.http.post(REVIEW_API + "/like/" + reviewId, { username: username })
  }

}
