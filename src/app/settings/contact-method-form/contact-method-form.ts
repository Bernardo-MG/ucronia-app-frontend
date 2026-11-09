import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ContactMethod } from '@ucronia/domain';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-contact-method-form',
  imports: [ReactiveFormsModule, InputTextModule, MessageModule],
  templateUrl: './contact-method-form.html'
})
export class ContactMethodForm {

  @Input() public set data(value: ContactMethod) {
    this.form.patchValue(value as any);
    this.isEdit = true;
  }
  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly save = output<ContactMethod>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public isEdit = false;
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  public constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.group({
      number: [null],
      name: [null, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  // Event handlers
  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  // Public methods
  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}
