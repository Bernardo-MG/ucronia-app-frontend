import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdminMemberService } from './admin-member.service';

describe('AdminMemberService', () => {
  let service: AdminMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AdminMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
