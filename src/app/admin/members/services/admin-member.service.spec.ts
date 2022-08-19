import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdminMemberService } from './admin-member.service';

describe('AdminMemberService', () => {
  let service: AdminMemberService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(AdminMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
