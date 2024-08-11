import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityCalendarFrontpageComponent } from './activity-calendar-frontpage.component';

describe('ActivityCalendarFrontpageComponent', () => {
  let component: ActivityCalendarFrontpageComponent;
  let fixture: ComponentFixture<ActivityCalendarFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ActivityCalendarFrontpageComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityCalendarFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
