import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Member, MemberName } from '@ucronia/domain';
import { MemberUpdate } from '../../members/member-update';
import { MemberEndpoint } from './member-endpoint';

describe('MemberEndpoint full update', () => {
  let endpoint: MemberEndpoint;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    endpoint = new MemberEndpoint(TestBed.inject(HttpClient), '/api');
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('sends the supplied model directly through PUT', () => {
    const data: MemberUpdate = {
      name: Object.assign(new MemberName(), { firstName: 'Ana', lastName: 'Test' }),
      feeType: 3,
      contactChannels: [],
      active: false,
      renew: false,
      identifier: '',
      address: '',
      comments: '',
      birthDate: undefined
    };

    endpoint.update(10, data).subscribe();
    const request = http.expectOne('/api/profile/member/10');

    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toBe(data);
    expect(request.request.body.key).toBeUndefined();

    request.flush({ content: Object.assign(new Member(), { number: 10, memberNumber: 15 }) });
  });
});
