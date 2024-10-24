import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionReportWidgetComponent } from './transaction-report-widget.component';

describe('TransactionReportWidgetComponent', () => {
  let component: TransactionReportWidgetComponent;
  let fixture: ComponentFixture<TransactionReportWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionReportWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionReportWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
