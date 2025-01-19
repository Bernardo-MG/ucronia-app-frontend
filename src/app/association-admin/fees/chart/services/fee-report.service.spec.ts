import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeReportService } from './fee-report.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FeeReportService', () => {
  let service: FeeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
        FeeReportService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    service = TestBed.inject(FeeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
