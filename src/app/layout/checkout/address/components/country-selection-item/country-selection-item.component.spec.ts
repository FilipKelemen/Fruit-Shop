import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectionItemComponent } from './country-selection-item.component';

describe('CountrySelectionItemComponent', () => {
  let component: CountrySelectionItemComponent;
  let fixture: ComponentFixture<CountrySelectionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrySelectionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
