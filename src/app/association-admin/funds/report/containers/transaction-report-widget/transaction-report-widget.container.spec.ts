import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionReportWidgetContainer } from './transaction-report-widget.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionReportWidgetContainer', () => {
  let component: TransactionReportWidgetContainer;
  let fixture: ComponentFixture<TransactionReportWidgetContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TransactionReportWidgetContainer],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
