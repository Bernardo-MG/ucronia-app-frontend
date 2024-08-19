import { FormControl } from '@angular/forms';
import { isbnValidator } from './isbn.validator';

describe('isbnValidator', () => {

  it('should return null for a valid ISBN-10', () => {
    const control = new FormControl('0-306-40615-2');
    const result = isbnValidator()(control);
    expect(result).toBeNull();
  });

  it('should return null for a valid ISBN-10 with X', () => {
    const control = new FormControl('0-201-53082-X');
    const result = isbnValidator()(control);
    expect(result).toBeNull();
  });

  it('should return null for a valid ISBN-13', () => {
    const control = new FormControl('978-3-16-148410-0');
    const result = isbnValidator()(control);
    expect(result).toBeNull();
  });

  it('should return an error object for an invalid ISBN-10', () => {
    const control = new FormControl('0-306-40615-9');
    const result = isbnValidator()(control);
    expect(result).toEqual({ 'invalidISBN': true });
  });

  it('should return an error object for an invalid ISBN-13', () => {
    const control = new FormControl('978-3-16-148410-9');
    const result = isbnValidator()(control);
    expect(result).toEqual({ 'invalidISBN': true });
  });

  it('should return an error object for an invalid format (not ISBN-10 or ISBN-13)', () => {
    const control = new FormControl('123-456-789');
    const result = isbnValidator()(control);
    expect(result).toEqual({ 'invalidISBN': true });
  });

  it('should return null for an empty value', () => {
    const control = new FormControl('');
    const result = isbnValidator()(control);
    expect(result).toBeNull();
  });

  it('should return an error object for a string that is too long', () => {
    const control = new FormControl('978-3-16-148410-00');
    const result = isbnValidator()(control);
    expect(result).toEqual({ 'invalidISBN': true });
  });

});
