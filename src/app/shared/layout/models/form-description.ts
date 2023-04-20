import { ValidationErrors } from "@angular/forms";

export class FormDescription {
  name = '';
  property = '';
  type = '';
  validator: ValidationErrors | null = null;
}