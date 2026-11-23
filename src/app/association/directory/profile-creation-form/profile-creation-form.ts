import { InputGroupModule } from '@openng/optimus-ui/inputgroup';
import { InputGroupAddonModule } from '@openng/optimus-ui/inputgroupaddon';
import { Component, inject, input, output, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { MessageModule } from '@openng/optimus-ui/message';

@Component({
  selector: 'assoc-profile-creation-form',
  imports: [InputGroupModule, InputGroupAddonModule, ReactiveFormsModule, InputTextModule, MessageModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './profile-creation-form.html'
})
export class ProfileCreationForm {

  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly save = output<ProfileCreationFormData>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  public constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.group({
      name: formBuilder.group({
        firstName: [null, Validators.required],
        nickname: [''],
        lastName: ['']
      })
    });

    this.formStatus = new FormStatus(this.form);
  }

  // Event handlers
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

  // Public methods
  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}

export class ProfileCreationFormData {
  constructor(
    public name: {
      firstName: string,
      nickname?: string,
      lastName: string
    }
  ) { }
}
