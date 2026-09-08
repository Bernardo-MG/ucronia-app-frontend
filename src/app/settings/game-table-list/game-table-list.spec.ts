import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { GameTableList } from './game-table-list';

describe('GameTableList', () => {
  let fixture: ComponentFixture<GameTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTableList], providers: [ConfirmationService]
    }).compileComponents();
    fixture = TestBed.createComponent(GameTableList);
    fixture.detectChanges();
  });

  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
