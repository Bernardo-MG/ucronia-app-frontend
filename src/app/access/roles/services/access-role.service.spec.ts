import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AccessRoleService } from './access-role.service';

describe('AccessRoleService', () => {
  let service: AccessRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AccessRoleService
      ]
    });
    service = TestBed.inject(AccessRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
