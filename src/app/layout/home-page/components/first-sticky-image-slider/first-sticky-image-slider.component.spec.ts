import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstStickyImageSliderComponent } from './first-sticky-image-slider.component';

describe('FirstStickyImageSliderComponent', () => {
  let component: FirstStickyImageSliderComponent;
  let fixture: ComponentFixture<FirstStickyImageSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstStickyImageSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStickyImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
