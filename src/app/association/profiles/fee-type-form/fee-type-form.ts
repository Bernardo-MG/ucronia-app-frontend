import { Component, inject, input, Input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { FeeType } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-type-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabelModule, MessageModule],
  templateUrl: './fee-type-form.html'
})
export class FeeTypeForm {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  @Input() public set data(value: FeeType) {
    this.form.patchValue(value as any);
  }

  public readonly save = output<FeeType>();

  public formStatus: FormStatus;
  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [null],
      name: [null, Validators.required],
      amount: [null, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public submit() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}
