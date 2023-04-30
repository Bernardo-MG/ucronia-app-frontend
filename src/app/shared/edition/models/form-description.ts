import { ValidationErrors } from "@angular/forms";

export class FormDescription {
  name = '';
  property = '';
  type = '';
  validator: ValidationErrors | null = null;

  constructor(
    name: string,
    property: string,
    type: string,
    validator: ValidationErrors | null = null
  ) {
    this.name = name;
    this.property = property;
    this.type = type;
    this.validator = validator;
  }

}