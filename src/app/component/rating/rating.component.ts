import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() ratings: number = 0;

  stars: string[] = []

  ngOnInit(): void {
    const unratedStars: number = 5 - this.ratings
    for (let i = 0; i < this.ratings; i++)
      this.stars.push("star")
    for (let j = 0; j < unratedStars; j++)
      this.stars.push("star_outline")
  }

}
