import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormWithListSelection } from './form-with-list-selection';

describe('FormWithListSelection', () => {
  let component: FormWithListSelection;
  let fixture: ComponentFixture<FormWithListSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormWithListSelection, FormsModule, ReactiveFormsModule, ButtonModule, TableModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormWithListSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
    expect(component.rows).toEqual([]);
    expect(component.selecting).toBeFalse();
  });

  it('should load rows when the data is set', () => {
    const data = [{ name: 'name', number: 1 }];
    component.data = data;

    expect(component.rows).toEqual(data);
  });

  describe('selection', () => {

    it('should enter selecting mode when starts selecting', () => {
      component.onStartSelecting();
      expect(component.selecting).toBeTrue();
    });

    it('should add new row when selected and exit selecting mode', () => {
      const row1 = { name: 'name 1', number: 1 };
      const row2 = { name: 'name 2', number: 2 };
      component.data = [row1];

      component.onStartSelecting();
      component.onChoose(row2);

      expect(component.rows).toEqual([row1, row2]);
      expect(component.selecting).toBeFalse();
    });

    it('should not add duplicate row when already selected', () => {
      const row = { name: 'name', number: 1 };
      component.data = [row];

      component.onChoose(row);

      expect(component.rows).toEqual([row]);
      expect(component.selecting).toBeFalse();
    });

  });

  describe('remove', () => {

    it('should remove row', () => {
      const row1 = { name: 'name 1', number: 1 };
      const row2 = { name: 'name 2', number: 2 };
      component.data = [row1, row2];

      component.onRemove(row1);

      expect(component.rows).toEqual([row2]);
    });

    it('should invalidate form when last row is removed', () => {
      const row = { name: 'only row', number: 1 };
      component.data = [row];

      component.onRemove(row);

      expect(component.form.valid).toBeFalse();
    });

  });

  describe('save', () => {

    it('should emit save event when form is valid', () => {
      const spy = jasmine.createSpy();
      component.save.subscribe(spy);

      const row = { name: 'name', number: 1 };
      component.data = [row];

      component.onSave();

      expect(spy).toHaveBeenCalledWith([row]);
    });

    it('should not emit save event when form is invalid', () => {
      const spy = jasmine.createSpy();
      component.save.subscribe(spy);

      // Empty rows
      component.onSave();

      expect(spy).not.toHaveBeenCalled();
    });

  });

  describe('save button', () => {

    it('should disable save button when the form is invalid', () => {
      component.data = [];

      expect(component.formStatus.saveEnabled).toBeFalse();
    });

    it('should enable save button when the form is valid and dirty', () => {
      const row = { name: 'valid', number: 1 };
      component.data = [row];
      component.form.markAsDirty();

      expect(component.formStatus.saveEnabled).toBeTrue();
    });

    it('should disable save button when loading', () => {
      const row = { name: 'valid', number: 1 };
      component.data = [row];
      component.form.markAsDirty();
      component.formStatus.loading = true;

      expect(component.formStatus.saveEnabled).toBeFalse();
    });

  });

});
