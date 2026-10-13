import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus, notEmptyStringValidator } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { FeeCreation } from '@ucronia/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'shared-name-form',
  imports: [DrawerFormActions, FormsModule, ReactiveFormsModule, InputTextModule, MessageModule, ButtonModule],
  templateUrl: './name-form.html'
})
export class NameForm implements OnChanges {

  public readonly cancelEdition = output<void>();

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: any) {
    this.form.patchValue(value);
  }

  public readonly save = output<FeeCreation>();

  public formStatus: FormStatus;

  public memberName = "";

  public form: FormGroup;

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
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
}
