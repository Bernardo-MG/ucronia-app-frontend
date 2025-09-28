
import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@app/core/form/form-status/form-status';
import { FeeCreation } from '@app/domain/fees/fee-creation';
import { User } from '@bernardo-mg/authentication';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'access-user-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule, ButtonModule],
  templateUrl: './access-user-form.html'
})
export class AccessUserForm implements OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  public readonly create = input(true);

  @Input() public set data(value: User) {
    this.form.patchValue(value as any);
  }

  public readonly save = output<FeeCreation>();

  public formStatus: FormStatus;

  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
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

}
