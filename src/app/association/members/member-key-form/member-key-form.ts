import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Key } from '@ucronia/domain';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'assoc-member-key-form',
  imports: [DrawerFormActions,
    ReactiveFormsModule,
    InputTextModule,
    ToggleSwitchModule,
    MessageModule
  ],
  templateUrl: './member-key-form.html'
})
export class MemberKeyForm {

  public readonly cancelEdition = output<void>();

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly failures = input(new FailureStore());

  @Input() public set data(value: Key | undefined) {
    if (value) {
      this.form.patchValue(value as any);
      this.isEdit = true;
    } else {
      this.form.reset({ number: null, available: true, description: '' });
      this.isEdit = false;
    }
  }

  public readonly save = output<Key>();

  public readonly formStatus: FormStatus;
  public readonly form: FormGroup;

  public isEdit = false;

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      number: [null],
      available: [true],
      description: ['']
    });

    this.formStatus = new FormStatus(this.form);
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}
