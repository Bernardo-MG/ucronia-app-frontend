import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FeeCalendarService } from '../../services/fee-calendar.service';
import { FeeCalendarWidgetContainer } from './fee-calendar-widget.container';

describe('FeeCalendarWidgetContainer', () => {
  let component: FeeCalendarWidgetContainer;
  let fixture: ComponentFixture<FeeCalendarWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeCalendarWidgetContainer
      ],
      providers: [
        FeeCalendarService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCalendarWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
