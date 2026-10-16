import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Activity } from '@ucronia/domain';

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

  it('should return the range from the earliest start to the latest end', () => {
    const activity = new Activity();
    activity.dates = [
      { start: new Date('2026-09-11T18:00:00Z'), end: new Date('2026-09-11T20:00:00Z') },
      { start: new Date('2026-09-09T17:00:00Z'), end: new Date('2026-09-09T19:00:00Z') },
      { start: new Date('2026-09-10T16:00:00Z'), end: new Date('2026-09-12T21:00:00Z') }
    ];

    expect(component.dateRange(activity)).toEqual({
      start: new Date('2026-09-09T17:00:00Z'),
      end: new Date('2026-09-12T21:00:00Z')
    });
  });

  it('should return undefined when the activity has no dates', () => {
    expect(component.dateRange(new Activity())).toBeUndefined();
  });

  it('should sort activity dates without changing the source array', () => {
    const activity = new Activity();
    activity.dates = [
      { start: new Date('2026-09-15T18:00:00Z'), end: new Date('2026-09-15T21:00:00Z') },
      { start: new Date('2026-09-08T18:00:00Z'), end: new Date('2026-09-08T21:00:00Z') },
      { start: new Date('2026-09-10T18:00:00Z'), end: new Date('2026-09-10T21:00:00Z') }
    ];

    const sorted = component.sortedDates(activity);

    expect(sorted.map(date => date.start)).toEqual([
      new Date('2026-09-08T18:00:00Z'),
      new Date('2026-09-10T18:00:00Z'),
      new Date('2026-09-15T18:00:00Z')
    ]);
    expect(activity.dates[0].start).toEqual(new Date('2026-09-15T18:00:00Z'));
  });
});
