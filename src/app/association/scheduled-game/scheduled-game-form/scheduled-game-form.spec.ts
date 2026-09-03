import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledGameForm } from './scheduled-game-form';
import { GameTable, ScheduledGame } from '@ucronia/domain';

describe('ScheduledGameForm', () => {
  let component: ScheduledGameForm;
  let fixture: ComponentFixture<ScheduledGameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledGameForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScheduledGameForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should restore the selected table when editing', () => {
    const table = new GameTable();
    const game = new ScheduledGame();
    table.number = 3;
    table.name = 'Mesa 3';
    game.table = table.number;

    fixture.componentRef.setInput('tables', [table]);
    fixture.componentRef.setInput('data', game);
    fixture.detectChanges();

    expect(component.form.get('table')?.value).toBe(3);
  });
});
