import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeReportService } from '../../services/fee-report-service';
import { FeePaymentChartComponent } from './fee-payment-chart';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FeePaymentChartComponent', () => {
  let component: FeePaymentChartComponent;
  let fixture: ComponentFixture<FeePaymentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FeePaymentChartComponent],
    providers: [
        FeeReportService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(FeePaymentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
