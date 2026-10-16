import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { GameTableService } from './game-table-service';

describe('GameTableService', () => {
  const client = { gameTable: {
    page: jasmine.createSpy().and.returnValue(of({ content: [] })),
    create: jasmine.createSpy().and.returnValue(of({})),
    update: jasmine.createSpy().and.returnValue(of({})),
    delete: jasmine.createSpy().and.returnValue(of({}))
  } };

  beforeEach(() => TestBed.configureTestingModule({ providers: [
    MessageService, { provide: UcroniaClient, useValue: client }
  ] }));

  it('should be created', () => {
    expect(TestBed.inject(GameTableService)).toBeTruthy();
  });
});
