import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { of, Subject } from 'rxjs';
import { DirectoryService } from './directory-service';
import { FullProfile } from './model/full-profile';

describe('DirectoryService', () => {
  let service: DirectoryService;

  const mockUcroniaClient = {
    guest: {
      patch: jasmine.createSpy()
    },
    profile: {
      patch: jasmine.createSpy(),
      transform: {
        toGuest: jasmine.createSpy()
      },
      guest: {
        create: jasmine.createSpy().and.returnValue(of({})),
        update: jasmine.createSpy().and.returnValue(of({})),
        get: jasmine.createSpy().and.returnValue(of({})),
        delete: jasmine.createSpy().and.returnValue(of({})),
        page: jasmine.createSpy().and.returnValue(of({
          content: [],
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0
        }))
      }
    }
  };

  const securityClientMock = {
    profile: {
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
        MessageService,
        { provide: SecurityClient, useValue: securityClientMock },
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(DirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('uses the submitted profile values after a pending conversion finishes', () => {
    const conversion = new Subject<unknown>();
    mockUcroniaClient.profile.transform.toGuest.and.returnValue(conversion);
    mockUcroniaClient.profile.patch.and.returnValue(of({}));
    mockUcroniaClient.guest.patch.and.returnValue(of({}));

    const profile = new FullProfile();
    profile.number = 12;
    profile.name.firstName = 'Ana';
    profile.types = ['guest'];
    profile.contactChannels = [{ method: { number: 3, name: 'Email' }, detail: 'ana@example.com' }];
    service.update(profile, [], profile.types).subscribe();

    expect(mockUcroniaClient.profile.transform.toGuest).toHaveBeenCalledOnceWith(12);
    expect(mockUcroniaClient.profile.patch).not.toHaveBeenCalled();

    profile.number = 99;
    profile.name.firstName = 'Bob';
    profile.contactChannels[0].method.number = 8;
    profile.types.length = 0;

    conversion.next({});
    conversion.complete();

    const expectedPatch = jasmine.objectContaining({
      name: jasmine.objectContaining({ firstName: 'Ana' }),
      contactChannels: [{ method: 3, detail: 'ana@example.com' }]
    });
    expect(mockUcroniaClient.profile.patch).toHaveBeenCalledOnceWith(12, expectedPatch);
    expect(mockUcroniaClient.guest.patch).toHaveBeenCalledOnceWith(12, expectedPatch);
  });
});
