import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionBalanceChartComponent } from './transaction-balance-chart.component';

describe('TransactionBalanceChartComponent', () => {
  let component: TransactionBalanceChartComponent;
  let fixture: ComponentFixture<TransactionBalanceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TransactionBalanceChartComponent
      ]
    });
    fixture = TestBed.createComponent(TransactionBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit startMonthChange event on start month selection', () => {
    component.months = ['2024-01'];
    fixture.detectChanges();

    spyOn(component.startMonthChange, 'emit');
    const select = fixture.nativeElement.querySelector('select[aria-label="Start month"]');
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    expect(component.startMonthChange.emit).toHaveBeenCalledWith(select.value);
  });

  it('should emit endMonthChange event on end month selection', () => {
    component.months = ['2024-01'];
    fixture.detectChanges();

    spyOn(component.endMonthChange, 'emit');
    const select = fixture.nativeElement.querySelector('select[aria-label="End month"]');
    select.value = select.options[0].value;
    select.dispatchEvent(new Event('change'));
    expect(component.endMonthChange.emit).toHaveBeenCalledWith(select.value);
  });

});
