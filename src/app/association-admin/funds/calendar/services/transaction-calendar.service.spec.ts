import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionCalendarService } from './transaction-calendar.service';

describe('TransactionCalendarService', () => {
  let service: TransactionCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(TransactionCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
