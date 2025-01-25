import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeReportService } from '../../services/fee-report.service';
import { FeePaymentChartWidgetContainer } from './fee-payment-chart-widget.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FeePaymentChartWidgetContainer', () => {
  let component: FeePaymentChartWidgetContainer;
  let fixture: ComponentFixture<FeePaymentChartWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FeePaymentChartWidgetContainer],
    providers: [
        FeeReportService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(FeePaymentChartWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
