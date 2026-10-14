import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus, notEmptyStringValidator } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'shared-name-form',
  imports: [DrawerFormActions, ReactiveFormsModule, InputTextModule, MessageModule],
  templateUrl: './name-form.html'
})
export class NameForm implements OnChanges {

  public readonly cancelEdition = output<void>();

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: NameFormData) {
    this.form.patchValue(value);
  }

  public readonly save = output<NameFormData>();

  public formStatus: FormStatus;

  public form: FormGroup;

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

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
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
