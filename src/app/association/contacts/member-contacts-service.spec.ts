import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { MemberContactsService } from './member-contacts-service';

describe('MemberContactsService', () => {
  let service: MemberContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MemberContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
