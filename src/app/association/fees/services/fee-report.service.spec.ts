import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeReportService } from './fee-report.service';

describe('FeeReportService', () => {
  let service: FeeReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        FeeReportService
      ]
    });
    service = TestBed.inject(FeeReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
