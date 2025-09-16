import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TransactionService } from '@app/association-admin/funds/core/transaction-service/transaction-service';
import { TransactionCreationForm } from './transaction-creation-form';

describe('TransactionCreation', () => {
  let component: TransactionCreationForm;
  let fixture: ComponentFixture<TransactionCreationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionCreationForm
      ],
      providers: [
        TransactionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionCreationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
