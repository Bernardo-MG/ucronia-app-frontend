import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Key } from '@ucronia/domain';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'assoc-member-key-form',
  imports: [ReactiveFormsModule, InputTextModule, ToggleSwitchModule, MessageModule],
  templateUrl: './member-key-form.html'
})
export class MemberKeyForm {

  @Input() public set data(value: Key | undefined) {
    if (value) {
      this.form.reset({ number: value.number, available: value.available, description: value.description });
      this.isEdit = true;
    } else {
      this.form.reset({ number: null, available: true, description: '' });
      this.isEdit = false;
    }
  }

  public readonly failures = input(new FailureStore());

  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }

  public readonly save = output<Key>();
  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;

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
