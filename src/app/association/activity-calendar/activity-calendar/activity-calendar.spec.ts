import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityCalendar } from './activity-calendar';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ActivityCalendar', () => {
  let component: ActivityCalendar;
  let fixture: ComponentFixture<ActivityCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActivityCalendar
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActivityCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
