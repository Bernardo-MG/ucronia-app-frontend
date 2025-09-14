import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TransactionService } from '@app/association-admin/funds/core/transaction-service/transaction-service';
import { TransactionCreation } from './transaction-creation';

describe('TransactionCreation', () => {
  let component: TransactionCreation;
  let fixture: ComponentFixture<TransactionCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionCreation
      ],
      providers: [
        TransactionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
