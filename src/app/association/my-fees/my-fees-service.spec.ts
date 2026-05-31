import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { MyFeesService } from './my-fees-service';
import { SecurityClient } from '@bernardo-mg/security';

describe('MyFeesService', () => {
  let service: MyFeesService;

  const mockUcroniaClient = {
    myFees: {
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    }
  };

  const securityClientMock = {
    account: jasmine.createSpy()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient },
        { provide: SecurityClient, useValue: securityClientMock }
      ]
    });
    service = TestBed.inject(MyFeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
