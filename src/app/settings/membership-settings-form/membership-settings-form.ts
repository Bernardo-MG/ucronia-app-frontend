import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'assoc-membership-settings-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, FloatLabelModule, IconFieldModule, InputIconModule, ButtonModule],
  templateUrl: './membership-settings-form.html'
})
export class MembershipSettingsForm implements OnChanges {

  public readonly feeAmount = input('');
  public readonly loading = input(false);

  public readonly save = output<{ feeAmount: string }>();

  public formStatus: FormStatus;

  /**
   * Form structure.
   */
  public form: FormGroup;

  constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.nonNullable.group({
      feeAmount: ['']
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading, feeAmount }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
    if (feeAmount) {
      this.form.get('feeAmount')?.setValue(feeAmount.currentValue);
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

}
