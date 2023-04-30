import { ValidationErrors } from "@angular/forms";

export class FormDescription {
  name;
  property;
  type;
  validator;
  editable;

  constructor(
    name: string,
    property: string,
    type: string,
    validator: ValidationErrors | null = null,
    editable = true
  ) {
    this.name = name;
    this.property = property;
    this.type = type;
    this.validator = validator;
    this.editable = editable;
  }

}