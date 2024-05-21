import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityCalendarService } from '../../services/activity-calendar.service';
import { ActivityCalendarWidgetComponent } from './activity-calendar-widget.component';

describe('ActivityCalendarWidgetComponent', () => {
  let component: ActivityCalendarWidgetComponent;
  let fixture: ComponentFixture<ActivityCalendarWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActivityCalendarWidgetComponent
      ],
      providers: [
        ActivityCalendarService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityCalendarWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
