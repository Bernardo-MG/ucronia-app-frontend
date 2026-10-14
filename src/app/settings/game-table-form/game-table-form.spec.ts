import { ComponentFixture } from '@angular/core/testing';
import { createFormFixture, editForm } from '@app/testing/form-test-helpers';
import { GameTableForm } from './game-table-form';

describe('GameTableForm', () => {
  let fixture: ComponentFixture<GameTableForm>;
  let component: GameTableForm;

  beforeEach(() => {
    fixture = createFormFixture(GameTableForm);
    component = fixture.componentInstance;
  });

  it('requires the table name and description', () => {
    editForm(component.form, { name: 'Table A' });
    expect(component.form.invalid).toBeTrue();
    editForm(component.form, { description: 'Main room' });
    expect(component.form.valid).toBeTrue();
  });
});
