import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionService } from './transaction.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
        TransactionService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
