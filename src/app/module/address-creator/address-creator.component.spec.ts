import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCreatorComponent } from './address-creator.component';

describe('AddressCreatorComponent', () => {
  let component: AddressCreatorComponent;
  let fixture: ComponentFixture<AddressCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
