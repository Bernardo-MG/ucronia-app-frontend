import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { FeeTypeService } from './fee-type-service';

describe('FeeTypeService', () => {
  let service: FeeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FeeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
