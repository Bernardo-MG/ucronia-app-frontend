import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@bernardo-mg/authentication';
import { Page } from '@bernardo-mg/request';
import { GameTable } from '@ucronia/domain';
import { ConfirmationService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { GameTableService } from '../game-table-service';
import { GameTableView } from './game-table-view';

describe('GameTableView', () => {
  let fixture: ComponentFixture<GameTableView>;
  const service = {
    getAll: vi.fn().mockName("GameTableService.getAll"), create: vi.fn().mockName("GameTableService.create"), update: vi.fn().mockName("GameTableService.update"), delete: vi.fn().mockName("GameTableService.delete")
};
  const auth = {
    hasPermission: vi.fn().mockName("AuthService.hasPermission")
};

  beforeEach(async () => {
    service.getAll.mockReturnValue(of(new Page<GameTable>()));
    auth.hasPermission.mockReturnValue(true);
    await TestBed.configureTestingModule({
      imports: [GameTableView], providers: [
        ConfirmationService,
        { provide: GameTableService, useValue: service },
        { provide: AuthService, useValue: auth }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(GameTableView);
    fixture.detectChanges();
  });

  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
