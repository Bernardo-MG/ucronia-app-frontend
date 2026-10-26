import { TestBed } from '@angular/core/testing';
import { Sorting } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { PublicMemberService } from './public-member-service';

describe('PublicMemberService', () => {
  let service: PublicMemberService;

  const mockUcroniaClient = {
    member: {
      page: jasmine.createSpy().and.returnValue(
        of({
          content: [],
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0
        })
      )
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UcroniaClient, useValue: mockUcroniaClient }]
    });

    service = TestBed.inject(PublicMemberService);
  });

  it('uses the member number as the stable public-list sort key', () => {
    service.getAll(undefined, new Sorting(), '').subscribe();
    const sorting = mockUcroniaClient.member.page.calls.mostRecent().args[2] as Sorting;

    expect(sorting.properties.map(property => property.property)).toContain('memberNumber');
    expect(sorting.properties.map(property => property.property)).not.toContain('number');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
