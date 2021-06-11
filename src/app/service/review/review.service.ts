import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewDTO } from '@model/dto/review.dto';
import { REVIEW_API, username } from 'config/http.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  saveReview(reviewDto: ReviewDTO) {
    return this.http.post(REVIEW_API, reviewDto)
  }

  likeReview(reviewId: number) {
    return this.http.post(REVIEW_API + "/like/" + reviewId, { username: username })
  }

  getReviewLikes(reviewId: number): Observable<number> {
    return this.http.get<number>(REVIEW_API + "/likes/" + reviewId)
  }



}
