import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCreatorComponent } from './review-creator.component';

describe('ReviewCreatorComponent', () => {
  let component: ReviewCreatorComponent;
  let fixture: ComponentFixture<ReviewCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
