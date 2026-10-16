import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Component, inject, input, output, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-profile-creation-form',
  imports: [InputGroupModule, InputGroupAddonModule, DrawerFormActions, ReactiveFormsModule, InputTextModule, MessageModule],
  templateUrl: './profile-creation-form.html'
})
export class ProfileCreationForm {

  public readonly cancelEdition = output<void>();

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly failures = input(new FailureStore());

  public readonly save = output<ProfileCreationFormData>();

  public readonly formStatus: FormStatus;
  public readonly form: FormGroup;
  
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      name: fb.group({
        firstName: [null, Validators.required],
        nickname: [''],
        lastName: ['']
      })
    });

    this.formStatus = new FormStatus(this.form);
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

export class ProfileCreationFormData {
  constructor(
    public name: {
      firstName: string,
      nickname?: string,
      lastName: string
    }
  ) { }
}
