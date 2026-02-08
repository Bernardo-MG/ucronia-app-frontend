import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { of } from 'rxjs';
import { GameSystemCrudService } from './game-system-crud-service';

describe('GameSystemCrudService', () => {
  let service: GameSystemCrudService;

  const mockUcroniaClient = {
    library: {
      gameSystem: {
        create: jasmine.createSpy().and.returnValue(of({})),
        update: jasmine.createSpy().and.returnValue(of({})),
        get: jasmine.createSpy().and.returnValue(of({})),
        delete: jasmine.createSpy().and.returnValue(of({})),
        page: jasmine.createSpy().and.returnValue(of({
          content: [],
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0
        }))
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });

    service = TestBed.inject(GameSystemCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
