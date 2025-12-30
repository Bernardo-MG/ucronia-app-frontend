
import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-profile-creation-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, MessageModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './profile-creation-form.html'
})
export class ProfileCreationForm implements OnChanges {

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  public readonly save = output<ProfileCreationEvent>();

  public formStatus: FormStatus;
  public form: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      name: fb.group({
        firstName: [null, Validators.required],
        lastName: ['']
      })
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
    if (this.formStatus.saveEnabled) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}

export class ProfileCreationEvent {
  constructor(
    public name: { firstName: string, lastName: string }
  ) { }
}
