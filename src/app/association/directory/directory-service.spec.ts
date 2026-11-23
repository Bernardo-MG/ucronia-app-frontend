import { TestBed } from '@angular/core/testing';
import { SecurityClient } from '@bernardo-mg/security';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from '@openng/optimus-ui/api';
import { of, Subject } from 'rxjs';
import { DirectoryService } from './directory-service';
import { FullProfile } from './model/full-profile';

describe('DirectoryService', () => {
  let service: DirectoryService;

  const mockUcroniaClient = {
    guest: {
      patch: vi.fn()
    },
    profile: {
      patch: vi.fn(),
      transform: {
        toGuest: vi.fn()
      },
      guest: {
        create: vi.fn().mockReturnValue(of({})),
        update: vi.fn().mockReturnValue(of({})),
        get: vi.fn().mockReturnValue(of({})),
        delete: vi.fn().mockReturnValue(of({})),
        page: vi.fn().mockReturnValue(of({
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
      page: vi.fn().mockReturnValue(of({
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
    mockUcroniaClient.profile.transform.toGuest.mockReturnValue(conversion);
    mockUcroniaClient.profile.patch.mockReturnValue(of({}));
    mockUcroniaClient.guest.patch.mockReturnValue(of({}));

    const profile = new FullProfile();
    profile.number = 12;
    profile.name.firstName = 'Ana';
    profile.types = ['guest'];
    profile.contactChannels = [{ method: { number: 3, name: 'Email' }, detail: 'ana@example.com' }];
    service.update(profile, [], profile.types).subscribe();

    expect(mockUcroniaClient.profile.transform.toGuest).toHaveBeenCalledTimes(1);

    expect(mockUcroniaClient.profile.transform.toGuest).toHaveBeenCalledWith(12);
    expect(mockUcroniaClient.profile.patch).not.toHaveBeenCalled();

    profile.number = 99;
    profile.name.firstName = 'Bob';
    profile.contactChannels[0].method.number = 8;
    profile.types.length = 0;

    conversion.next({});
    conversion.complete();

    const expectedPatch = expect.objectContaining({
      name: expect.objectContaining({ firstName: 'Ana' }),
      contactChannels: [{ method: 3, detail: 'ana@example.com' }]
    });
    expect(mockUcroniaClient.profile.patch).toHaveBeenCalledTimes(1);
    expect(mockUcroniaClient.profile.patch).toHaveBeenCalledWith(12, expectedPatch);
    expect(mockUcroniaClient.guest.patch).toHaveBeenCalledTimes(1);
    expect(mockUcroniaClient.guest.patch).toHaveBeenCalledWith(12, expectedPatch);
  });
});
