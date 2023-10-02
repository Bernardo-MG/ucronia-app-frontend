import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuhtContainer } from './auth.service';

describe('AuhtContainer', () => {
  let service: AuhtContainer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuhtContainer
      ]
    });
    service = TestBed.inject(AuhtContainer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
