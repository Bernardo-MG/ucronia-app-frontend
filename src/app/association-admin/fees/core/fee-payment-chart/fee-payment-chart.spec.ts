import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeReportService } from '../fee-report-service/fee-report-service';
import { FeePaymentChart } from './fee-payment-chart';

describe('FeePaymentChart', () => {
  let component: FeePaymentChart;
  let fixture: ComponentFixture<FeePaymentChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FeePaymentChart],
    providers: [
        FeeReportService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(FeePaymentChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
