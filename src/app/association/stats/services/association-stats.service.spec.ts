import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AssociationStatsService } from './association-stats.service';

describe('AssociationStatsService', () => {
  let service: AssociationStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AssociationStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
