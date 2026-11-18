import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledGameForm } from './scheduled-game-form';
import { GameTable, ScheduledGame, RecurrenceUnit } from '@ucronia/domain';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

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

describe('ScheduledGameForm recurrence defaults', () => {
  it('keeps recurrence defaults valid when loading a non-recurring game', () => {
    const component = TestBed.runInInjectionContext(() => new ScheduledGameForm());
    const game = new ScheduledGame();
    game.recurrence = undefined;
    component.data = game;
    expect(component.form.get('recurrence.interval')?.value).toBe(0);
    expect(component.form.get('recurrence.unit')?.value).toBe(RecurrenceUnit.WEEKLY);
    expect(component.form.get('recurrence.unit')?.valid).toBeTrue();
  });
});

describe('ScheduledGameForm form submission', () => {
  const date = new Date(2026, 0, 15, 12);
  const scenario = { values: { title: 'One shot', maxPlayers: 4, start: date, master: 7 }, invalid: 'maxPlayers', expected: jasmine.objectContaining({ title: 'One shot', maxPlayers: 4, start: date, master: 7 }) };

  let fixture: ComponentFixture<ScheduledGameForm>;
  let component: ScheduledGameForm;
  let emitted: jasmine.Spy;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScheduledGameForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations()
      ]
    });
    fixture = TestBed.createComponent(ScheduledGameForm);
    component = fixture.componentInstance;
    form = component.form as FormGroup;
    fixture.componentRef.setInput('formId', 'form-contract');

    form.patchValue(scenario.values);

    form.markAsPristine();
    emitted = spyOn(component.save, 'emit');
    fixture.detectChanges();
    expect(form.valid).withContext('explicit fixture must be valid').toBeTrue();
  });

  function edit(): void {
    form.markAsDirty();
  }

  function submit(): void {
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  it('does not submit valid unchanged data', () => {
    expect(component.saveEnabled).toBeFalse();
    submit();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('emits the public payload once through native submission', () => {
    edit();
    submit();
    expect(emitted).toHaveBeenCalledOnceWith(scenario.expected);
  });

  it('blocks loading submissions and allows retry with the preserved edits', () => {
    edit();
    fixture.componentRef.setInput('loading', true);
    expect(component.formStatus.loading).toBeTrue();
    expect(form.disabled).toBeTrue();
    submit();
    expect(emitted).not.toHaveBeenCalled();
    fixture.componentRef.setInput('loading', false);
    expect(form.enabled).toBeTrue();
    expect(form.dirty).toBeTrue();
    submit();
    expect(emitted).toHaveBeenCalledOnceWith(scenario.expected);
  });

  it('rejects a real invalid field and exposes its validation state', () => {
    form.get(scenario.invalid)!.setValue(null);
    edit();
    expect(form.invalid).toBeTrue();
    submit();
    expect(form.get(scenario.invalid)!.touched).toBeTrue();
    expect(emitted).not.toHaveBeenCalled();
  });

  it('leaves submit and cancel controls to the drawer', () => {
    expect(fixture.nativeElement.querySelector('[data-action="submit"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[data-action="cancel"]')).toBeNull();
  });
});
