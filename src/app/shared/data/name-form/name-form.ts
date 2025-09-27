
import { Component, inject, input, Input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@app/core/form/form-status/form-status';
import { FeeCreation } from '@app/domain/fees/fee-creation';
import { Member } from '@app/domain/members/member';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'shared-name-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, MessageModule, ButtonModule],
  templateUrl: './name-form.html'
})
export class NameForm implements OnChanges {

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
      name: ['', Validators.required]
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
