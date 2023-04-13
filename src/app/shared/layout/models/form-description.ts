import { ValidationErrors } from "@angular/forms";

export class FormDescription {
    name: string = '';
    property: string = '';
    type: string = '';
    validator: ValidationErrors | null = null;
}