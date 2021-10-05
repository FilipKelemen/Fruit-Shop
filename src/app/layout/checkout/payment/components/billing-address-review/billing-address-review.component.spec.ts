import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAddressReviewComponent } from './billing-address-review.component';

describe('BillingAddressReviewComponent', () => {
  let component: BillingAddressReviewComponent;
  let fixture: ComponentFixture<BillingAddressReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingAddressReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
