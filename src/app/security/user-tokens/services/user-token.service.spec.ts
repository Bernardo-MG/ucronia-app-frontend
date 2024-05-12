import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserTokenService } from './user-token.service';

describe('UserTokenService', () => {
  let service: UserTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
