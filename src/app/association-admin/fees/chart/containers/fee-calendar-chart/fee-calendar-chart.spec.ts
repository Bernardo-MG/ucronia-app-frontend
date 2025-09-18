import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeReportService } from '../../services/fee-report-service';
import { FeeCalendarChart } from './fee-calendar-chart';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FeeCalendarChart', () => {
  let component: FeeCalendarChart;
  let fixture: ComponentFixture<FeeCalendarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeCalendarChart],
      providers: [
        FeeReportService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCalendarChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
