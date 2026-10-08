import { HttpClient } from '@angular/common/http';
import { AuditDetails } from '@ucronia/domain';
import { Observable, of } from 'rxjs';
import { mapAudit } from './audit-endpoint-utils';
import { ActivityEndpoint } from './activity-endpoint';
import { GuestEndpoint } from './guest-endpoint';
import { ImageEndpoint } from './image-endpoint';
import { FileEndpoint } from './file-endpoint';
import { LibraryEndpoint } from './library-endpoint';
import { MemberEndpoint } from './member-endpoint';
import { ProfileEndpoint } from './profile-endpoint';
import { ScheduledGameEndpoint } from './scheduled-game-endpoint';
import { SettingEndpoint } from './setting-endpoint';
import { SponsorEndpoint } from './sponsor-endpoint';
import { TransactionEndpoint } from './transaction-endpoint';
import { UserProfileEndpoint } from './user-profile-endpoint';

const instant = '2026-10-08T22:00:00Z';

function record() {
  return {
    audit: {
      createdAt: instant,
      updatedAt: instant,
      createdBy: { email: 'creator@example.com', username: 'creator', name: 'Creator' },
      updatedBy: { email: 'editor@example.com', username: 'editor', name: 'Editor' }
    },
    date: instant, start: instant, lendingDate: instant,
    dates: [{ start: instant, end: instant }],
    lendings: [{ lendingDate: instant, audit: { createdAt: instant, updatedAt: instant } }]
  };
}

function expectAudit(value: { audit?: AuditDetails | null }) {
  expect(value.audit?.createdAt instanceof Date).toBeTrue();
  expect(value.audit?.updatedAt instanceof Date).toBeTrue();
  expect(value.audit?.createdAt?.toISOString()).toBe(new Date(instant).toISOString());
  expect(value.audit?.createdBy?.username).toBe('creator');
  expect(value.audit?.updatedBy?.email).toBe('editor@example.com');
}

describe('Audit response mapping', () => {
  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'post', 'put', 'patch', 'delete']);
  });

  const factories = {
    profile: (client: HttpClient) => new ProfileEndpoint(client, '/api'),
    member: (client: HttpClient) => new MemberEndpoint(client, '/api'),
    guest: (client: HttpClient) => new GuestEndpoint(client, '/api'),
    sponsor: (client: HttpClient) => new SponsorEndpoint(client, '/api'),
    activity: (client: HttpClient) => new ActivityEndpoint(client, '/api'),
    game: (client: HttpClient) => new ScheduledGameEndpoint(client, '/api'),
    transaction: (client: HttpClient) => new TransactionEndpoint(client, '/api'),
    fictionBook: (client: HttpClient) => new LibraryEndpoint(client, '/api').fictionBook,
    gameBook: (client: HttpClient) => new LibraryEndpoint(client, '/api').gameBook,
    file: (client: HttpClient) => new FileEndpoint(client, '/api'),
    image: (client: HttpClient) => new ImageEndpoint(client, '/api')
  };

  Object.entries(factories).forEach(([name, factory]) => {
    it(`normalizes ${name} detail responses and preserves audit users`, () => {
      http.get.and.returnValue(of({ content: record() }));
      (factory(http).get(1) as Observable<{ audit?: AuditDetails }>).subscribe(expectAudit);
    });

    it(`normalizes ${name} delete responses`, () => {
      http.delete.and.returnValue(of({ content: record() }));
      (factory(http).delete(1) as Observable<{ audit?: AuditDetails }>).subscribe(expectAudit);
    });

    it(`normalizes ${name} page responses and preserves pagination`, () => {
      http.get.and.returnValue(of({ content: [record()], totalElements: 1 }));
      const endpoint = factory(http);
      // Transaction filters are positional and required by its existing signature.
      const result = endpoint instanceof TransactionEndpoint
        ? endpoint.page(1, undefined, undefined, undefined, undefined, undefined)
        : endpoint.page(1);
      (result as Observable<{ content: { audit?: AuditDetails }[] }>).subscribe(page => {
        expectAudit(page.content[0]);
        expect((page as unknown as { totalElements: number }).totalElements).toBe(1);
      });
    });
  });

  it('normalizes profile conversion responses', () => {
    http.put.and.returnValue(of({ content: record() }));
    const endpoint = new ProfileEndpoint(http, '/api').transform;
    endpoint.toMember(1, 2).subscribe(expectAudit);
    endpoint.toGuest(1).subscribe(expectAudit);
    endpoint.toSponsor(1).subscribe(expectAudit);
  });

  it('normalizes settings lists and updates', () => {
    const endpoint = new SettingEndpoint(http, '/api');
    http.get.and.returnValue(of({ content: [record()] }));
    endpoint.getAll().subscribe(values => expectAudit(values[0]));
    http.put.and.returnValue(of({ content: record() }));
    endpoint.update('code', { value: 'value' }).subscribe(expectAudit);
  });

  it('normalizes linked user profiles', () => {
    http.get.and.returnValue(of({ content: record() }));
    new UserProfileEndpoint(http, '/api').get('creator').subscribe(expectAudit);
  });

  it('normalizes lending pages and nested book lending audits', () => {
    const endpoint = new LibraryEndpoint(http, '/api');
    http.get.and.returnValue(of({ content: [record()] }));
    endpoint.lending.page(1).subscribe(page => {
      expectAudit(page.content[0]);
      expect(page.content[0].lendingDate instanceof Date).toBeTrue();
    });
    http.get.and.returnValue(of({ content: record() }));
    endpoint.gameBook.get(1).subscribe(book => {
      expect(book.lendings[0].audit?.createdAt instanceof Date).toBeTrue();
      expect(book.lendings[0].audit?.updatedAt instanceof Date).toBeTrue();
    });
  });

  it('preserves missing and null audit metadata', () => {
    const absent: { audit?: AuditDetails } = {};
    const nullAudit = { audit: null };
    const nullDates = { audit: { createdAt: null, updatedAt: null } };
    expect(mapAudit(absent)).toBe(absent);
    expect(mapAudit(nullAudit)).toBe(nullAudit);
    expect(mapAudit(nullDates).audit).toEqual({ createdAt: null, updatedAt: null });
  });

  it('can normalize dates repeatedly without changing their instant', () => {
    const value = { audit: { createdAt: new Date(instant), updatedAt: new Date(instant) } };
    mapAudit(mapAudit(value));
    expect(value.audit.createdAt.toISOString()).toBe(new Date(instant).toISOString());
  });
});
