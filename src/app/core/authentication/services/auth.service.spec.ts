import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthContainer } from './auth.service';

describe('AuhtContainer', () => {
  let service: AuthContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthContainer
      ]
    });
    service = TestBed.inject(AuthContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
