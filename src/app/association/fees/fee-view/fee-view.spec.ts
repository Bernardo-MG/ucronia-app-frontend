import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FeeCalendarService } from '../fee-calendar-service';
import { FeeReportService } from '../fee-report-service';
import { FeeService } from '../fee-service';
import { FeeView } from './fee-view';

describe('FeeView', () => {
  let component: FeeView;
  let fixture: ComponentFixture<FeeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeView
      ],
      providers: [
        FeeCalendarService,
        FeeService,
        FeeReportService,
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
