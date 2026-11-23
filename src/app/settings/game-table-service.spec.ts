import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { GameTableService } from './game-table-service';

describe('GameTableService', () => {
  const client = { gameTable: {
    page: vi.fn().mockReturnValue(of({ content: [] })),
    create: vi.fn().mockReturnValue(of({})),
    update: vi.fn().mockReturnValue(of({})),
    delete: vi.fn().mockReturnValue(of({}))
  } };

  beforeEach(() => TestBed.configureTestingModule({ providers: [
    MessageService, { provide: UcroniaClient, useValue: client }
  ] }));

  it('should be created', () => {
    expect(TestBed.inject(GameTableService)).toBeTruthy();
  });
});
