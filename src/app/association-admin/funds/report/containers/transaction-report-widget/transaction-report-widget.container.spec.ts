import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionReportWidgetContainer } from './transaction-report-widget.container';

describe('TransactionReportWidgetContainer', () => {
  let component: TransactionReportWidgetContainer;
  let fixture: ComponentFixture<TransactionReportWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TransactionReportWidgetContainer
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionReportWidgetContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
