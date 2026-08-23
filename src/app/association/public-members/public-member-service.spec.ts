import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { PublicMemberService } from './public-member-service';

describe('PublicMemberService', () => {
  let service: PublicMemberService;

  const mockUcroniaClient = {
    member: {
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(PublicMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
