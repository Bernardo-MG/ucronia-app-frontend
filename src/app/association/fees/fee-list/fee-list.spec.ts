import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { FeeCalendarService } from '../fee-calendar-service';
import { FeeReportService } from '../fee-report-service';
import { FeeService } from '../fee-service';
import { FeeList } from './fee-list';

describe('FeeList', () => {
  let component: FeeList;
  let fixture: ComponentFixture<FeeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FeeList
      ],
      providers: [
        FeeCalendarService,
        FeeService,
        FeeReportService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
