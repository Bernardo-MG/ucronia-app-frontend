import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeReportService } from '../../services/fee-report.service';
import { FeePaymentChartWidgetContainer } from './fee-payment-chart-widget.container';

describe('FeePaymentChartWidgetContainer', () => {
  let component: FeePaymentChartWidgetContainer;
  let fixture: ComponentFixture<FeePaymentChartWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FeePaymentChartWidgetContainer
      ],
      providers: [
        FeeReportService
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
