import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormStatus } from "./form-status";

describe('FormStatus', () => {

  let form: FormGroup;
  let status: FormStatus;

  beforeEach(() => {
    form = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('')
    });
    status = new FormStatus(form);
  });

  describe('loading flag', () => {

    it('should default to not loading', () => {
      expect(status.loading).toBeFalse();
    });

    it('should disable form when loading is true', () => {
      status.loading = true;
      expect(form.disabled).toBeTrue();
    });

    it('should enable form when loading is set back to false', () => {
      status.loading = true;
      status.loading = false;
      expect(form.enabled).toBeTrue();
    });

  });

  describe('save enabled', () => {

    it('should be false when form is invalid', () => {
      form.controls['name'].setValue('');
      form.markAsDirty();

      expect(status.saveEnabled).toBeFalse();
    });

    it('should be false when form is pristine', () => {
      form.controls['name'].setValue('John');
      form.markAsPristine();

      expect(status.saveEnabled).toBeFalse();
    });

    it('should be false when loading', () => {
      form.controls['name'].setValue('John');
      form.markAsDirty();
      status.loading = true;

      expect(status.saveEnabled).toBeFalse();
    });

    it('should be true when form is valid, dirty and not loading', () => {
      form.controls['name'].setValue('John');
      form.markAsDirty();

      expect(status.saveEnabled).toBeTrue();
    });

  });

  describe('cancel enabled', () => {

    it('should be true when not loading', () => {
      status.loading = false;
      expect(status.cancelEnabled).toBeTrue();
    });

    it('should be false when loading', () => {
      status.loading = true;
      expect(status.cancelEnabled).toBeFalse();
    });

  });

  describe('form enabled', () => {

    it('should return true when form is enabled', () => {
      expect(status.formEnabled).toBeTrue();
    });

    it('should return false when form is disabled', () => {
      form.disable();
      expect(status.formEnabled).toBeFalse();
    });

  });

  describe('isFormFieldInvalid', () => {

    it('should return false for unknown property', () => {
      expect(status.isFormFieldInvalid('unknown')).toBeFalse();
    });

    it('should return false when form is valid', () => {
      form.controls['name'].setValue('John');
      form.markAsDirty();

      expect(status.isFormFieldInvalid('name')).toBeFalse();
    });

    it('should return true when field is dirty and invalid', () => {
      form.controls['name'].markAsDirty();
      expect(status.isFormFieldInvalid('name')).toBeTrue();
    });

    it('should return false when field is dirty and valid', () => {
      form.controls['name'].setValue('John');
      form.markAsDirty();
      expect(status.isFormFieldInvalid('name')).toBeFalse();
    });

    it('should return true when field is touched and invalid', () => {
      form.controls['name'].markAsTouched();
      expect(status.isFormFieldInvalid('name')).toBeTrue();
    });

    it('should return false when field is touched and valid', () => {
      form.controls['name'].setValue('John');
      form.markAsTouched();
      expect(status.isFormFieldInvalid('name')).toBeFalse();
    });

    it('should return false when field invalid but neither dirty nor touched', () => {
      expect(status.isFormFieldInvalid('name')).toBeFalse();
    });

  });

});
