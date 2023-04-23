import { TestBed } from '@angular/core/testing';
import { SecurityContainer } from './security-container.service';

describe('SecurityContainer', () => {
  let service: SecurityContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SecurityContainer
      ]
    });
    service = TestBed.inject(SecurityContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
