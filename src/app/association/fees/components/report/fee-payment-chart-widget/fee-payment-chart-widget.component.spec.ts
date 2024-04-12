import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeReportService } from '@app/association/fees/services/fee-report.service';
import { FeePaymentChartWidgetComponent } from './fee-payment-chart-widget.component';

describe('FeePaymentChartWidgetComponent', () => {
  let component: FeePaymentChartWidgetComponent;
  let fixture: ComponentFixture<FeePaymentChartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FeePaymentChartWidgetComponent
      ],
      providers: [
        FeeReportService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeePaymentChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
