import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { MembershipEvolutionService } from './membership-evolution-service';

describe('MembershipEvolutionService', () => {
  let service: MembershipEvolutionService;

  const mockUcroniaClient = {
    library: {
      member: {
        evolution: vi.fn().mockReturnValue(of({}))
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(MembershipEvolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
