import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameTableForm } from './game-table-form';

describe('GameTableForm', () => {
  let fixture: ComponentFixture<GameTableForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GameTableForm] }).compileComponents();
    fixture = TestBed.createComponent(GameTableForm);
    fixture.detectChanges();
  });

  it('should create', () => expect(fixture.componentInstance).toBeTruthy());
});
