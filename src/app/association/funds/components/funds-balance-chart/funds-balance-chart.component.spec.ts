import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsBalanceChartComponent } from './funds-balance-chart.component';

describe('FundsBalanceChartComponent', () => {
  let component: FundsBalanceChartComponent;
  let fixture: ComponentFixture<FundsBalanceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundsBalanceChartComponent]
    });
    fixture = TestBed.createComponent(FundsBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
