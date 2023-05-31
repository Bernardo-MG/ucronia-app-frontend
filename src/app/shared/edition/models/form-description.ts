import { ValidatorFn } from "@angular/forms";
import { FormType } from "./form-type";

export class FormDescription {
  name;
  property;
  type;
  validator;

  constructor(
    name: string,
    property: string,
    type: FormType,
    validator: ValidatorFn | null = null
  ) {
    this.name = name;
    this.property = property;
    this.type = type;
    this.validator = validator;
  }

}