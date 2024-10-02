import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeeReportService } from '../../services/fee-report.service';
import { FeePaymentChartComponent } from './fee-payment-chart.component';

describe('FeePaymentChartWidgetComponent', () => {
  let component: FeePaymentChartComponent;
  let fixture: ComponentFixture<FeePaymentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FeePaymentChartComponent
      ],
      providers: [
        FeeReportService
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
