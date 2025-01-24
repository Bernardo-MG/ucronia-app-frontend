import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityCalendarFrontpageContainer } from './activity-calendar-frontpage.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ActivityCalendarFrontpageContainer', () => {
  let component: ActivityCalendarFrontpageContainer;
  let fixture: ComponentFixture<ActivityCalendarFrontpageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ActivityCalendarFrontpageContainer],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
