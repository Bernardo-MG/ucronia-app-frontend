import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FundsCalendarService } from './funds-calendar.service';

describe('FundsCalendarService', () => {
  let service: FundsCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        FundsCalendarService
      ]
    });
    service = TestBed.inject(FundsCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
