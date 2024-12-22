import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityCalendarFrontpageContainer } from './activity-calendar-frontpage.container';

describe('ActivityCalendarFrontpageContainer', () => {
  let component: ActivityCalendarFrontpageContainer;
  let fixture: ComponentFixture<ActivityCalendarFrontpageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ActivityCalendarFrontpageContainer
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityCalendarFrontpageContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
