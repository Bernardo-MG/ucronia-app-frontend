import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCarousel } from './activity-carousel';

describe('ActivityCarousel', () => {
  let component: ActivityCarousel;
  let fixture: ComponentFixture<ActivityCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
