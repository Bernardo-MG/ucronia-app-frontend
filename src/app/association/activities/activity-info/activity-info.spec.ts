import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInfo } from './activity-info';

describe('ActivityInfo', () => {
  let component: ActivityInfo;
  let fixture: ComponentFixture<ActivityInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
