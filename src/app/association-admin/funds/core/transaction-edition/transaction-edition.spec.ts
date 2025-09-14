import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TransactionService } from '@app/association-admin/funds/core/transaction-service/transaction-service';
import { TransactionEdition } from './transaction-edition';

describe('TransactionEdition', () => {
  let component: TransactionEdition;
  let fixture: ComponentFixture<TransactionEdition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionEdition
      ],
      providers: [
        TransactionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionEdition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
