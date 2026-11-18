import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MemberStatus, PublicMember } from '@ucronia/domain';
import { PublicMemberEndpoint } from './public-member-endpoint';

describe('PublicMemberEndpoint', () => {
  let endpoint: PublicMemberEndpoint;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    endpoint = new PublicMemberEndpoint(TestBed.inject(HttpClient), '/api');
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('converts joined dates and normalizes missing dates while preserving pagination', () => {
    endpoint.page().subscribe(page => {
      expect(page.content[0].joined).toEqual(new Date('2024-01-01T00:00:00Z'));
      expect(page.content[1].joined).toBeUndefined();
      expect(page.content[2].joined).toBeUndefined();
      expect(page.content[0].totalMonths).toBe(3);
      expect(page.page).toBe(1);
      expect(page.totalElements).toBe(3);
    });

    http.expectOne('/api/member').flush({
      content: [
        { ...new PublicMember(), joined: '2024-01-01T00:00:00Z', totalMonths: 3 },
        { ...new PublicMember(), joined: null, totalMonths: 0 },
        new PublicMember()
      ],
      page: 1,
      totalElements: 3
    });
  });

  it('sends the member status along with pagination and name', () => {
    endpoint.page(2, 10, undefined, 'Ana', MemberStatus.Inactive).subscribe();

    const request = http.expectOne(req => req.url === '/api/member');
    expect(request.request.params.get('status')).toBe('INACTIVE');
    expect(request.request.params.get('page')).toBe('2');
    expect(request.request.params.get('name')).toBe('Ana');
    request.flush({ content: [] });
  });
});
