import { InputNumberModule } from 'primeng/inputnumber';
import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { FeeType } from '@ucronia/domain';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-type-form',
  imports: [InputNumberModule, DrawerFormActions, ReactiveFormsModule, InputTextModule, MessageModule],
  templateUrl: './fee-type-form.html'
})
export class FeeTypeForm {

  public readonly cancelEdition = output<void>();

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: FeeType) {
    this.form.patchValue(value as any);
    this.isEdit = true;
  }

  public isEdit = false;

  public readonly save = output<FeeType>();

  public readonly formStatus: FormStatus;
  public readonly form: FormGroup;

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [null],
      name: [null, Validators.required],
      amount: [null, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

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
