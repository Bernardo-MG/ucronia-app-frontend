import { TestBed } from '@angular/core/testing';

import { AuthenticationContainer } from './authentication-container.service';

describe('AuthenticationContainer', () => {
  let service: AuthenticationContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
