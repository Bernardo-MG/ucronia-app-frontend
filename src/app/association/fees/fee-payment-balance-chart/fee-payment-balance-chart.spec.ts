import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeReportService } from '../fee-report-service';
import { FeePaymentBalanceChart } from './fee-payment-balance-chart';

describe('FeePaymentBalanceChart', () => {
  let component: FeePaymentBalanceChart;
  let fixture: ComponentFixture<FeePaymentBalanceChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FeePaymentBalanceChart],
    providers: [
        FeeReportService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(FeePaymentBalanceChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
