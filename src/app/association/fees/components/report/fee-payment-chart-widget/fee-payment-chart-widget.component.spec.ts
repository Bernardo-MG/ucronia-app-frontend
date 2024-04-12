import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePaymentChartWidgetComponent } from './fee-payment-chart-widget.component';

describe('FeePaymentChartWidgetComponent', () => {
  let component: FeePaymentChartWidgetComponent;
  let fixture: ComponentFixture<FeePaymentChartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeePaymentChartWidgetComponent]
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
