import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionReport } from './transaction-report';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionReport', () => {
  let component: TransactionReport;
  let fixture: ComponentFixture<TransactionReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TransactionReport],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();

    fixture = TestBed.createComponent(TransactionReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
