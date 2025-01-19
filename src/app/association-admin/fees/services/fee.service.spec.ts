import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeService } from './fee.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FeeService', () => {
  let service: FeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
        FeeService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(FeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
