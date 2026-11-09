import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus, notEmptyStringValidator } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'shared-name-form',
  imports: [ReactiveFormsModule, InputTextModule, MessageModule],
  templateUrl: './name-form.html'
})
export class NameForm {

  @Input() public set data(value: NameFormData) {
    this.form.patchValue(value);
  }

  public readonly failures = input(new FailureStore());

  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly save = output<NameFormData>();

  public readonly form: FormGroup;

  public readonly formStatus: FormStatus;

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [],
      name: ['', [Validators.required, notEmptyStringValidator]]
    });

    this.formStatus = new FormStatus(this.form);
  }

  /**
   * Handler for the save event.
   */
  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}

export interface NameFormData {
  number?: number | null;
  name: string;
}
