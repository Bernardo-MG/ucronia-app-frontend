import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@bernardo-mg/authentication';
import { Page } from '@bernardo-mg/request';
import { GameTable } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { GameTableService } from '../game-table-service';
import { GameTableView } from './game-table-view';

describe('GameTableView', () => {
  let fixture: ComponentFixture<GameTableView>;
  const service = jasmine.createSpyObj<GameTableService>('GameTableService', ['getAll', 'create', 'update', 'delete']);
  const auth = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission']);

  beforeEach(async () => {
    service.getAll.and.returnValue(of(new Page<GameTable>()));
    auth.hasPermission.and.returnValue(true);
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
