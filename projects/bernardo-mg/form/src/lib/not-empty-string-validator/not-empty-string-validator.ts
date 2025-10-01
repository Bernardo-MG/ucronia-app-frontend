import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const notEmptyStringValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  return value && value.trim() !== '' ? null : { empty: true };
};