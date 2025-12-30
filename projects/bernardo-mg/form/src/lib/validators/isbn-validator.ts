import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const isbnValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  let result: ValidationErrors | null;

  if (value) {
    // Regular expressions for ISBN-10 and ISBN-13 with optional hyphens
    const isbn10Regex = /^(?:\d{1,5}-\d{1,7}-\d{1,7}-[\dX])$/;
    const isbn13Regex = /^(?:\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d)$/;

    if ((isbn10Regex.test(value)) || (isbn13Regex.test(value))) {
      result = null;
    } else {
      result = { 'invalidISBN': true };
    }
  } else {
    result = null;
  }

  return result;
};
