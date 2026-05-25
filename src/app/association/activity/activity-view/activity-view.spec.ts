import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityView } from './activity-view';

describe('ActivityView', () => {
  let component: ActivityView;
  let fixture: ComponentFixture<ActivityView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
