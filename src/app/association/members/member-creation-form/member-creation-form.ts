import { Component, inject, input, Input, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { MemberCreation } from '@ucronia/api';
import { ContactMethod, FeeType, Key } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'assoc-member-creation-form',
  imports: [ReactiveFormsModule, DrawerFormActions, ButtonModule, DatePickerModule, InputGroupModule, InputGroupAddonModule, InputTextModule, MessageModule, SelectModule, TextareaModule, ToggleSwitchModule],
  templateUrl: './member-creation-form.html'
})
export class MemberCreationForm {

  private readonly fb = inject(FormBuilder);

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);
  public readonly failures = input(new FailureStore());
  public readonly feeTypes = input<FeeType[]>([]);
  public readonly contactMethods = input<ContactMethod[]>([]);
  public readonly keys = input<Key[]>([]);

  public readonly save = output<MemberCreation>();
  public readonly cancelEdition = output<void>();

  public readonly today = new Date();

  public readonly form = this.fb.group({
    feeType: this.fb.control<number | null>(null, Validators.required),
    identifier: ['', [Validators.maxLength(15)]],
    name: this.fb.nonNullable.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      nickname: ['', Validators.maxLength(50)],
      lastName: ['', Validators.maxLength(50)]
    }),
    birthDate: this.fb.control<Date | null>(null),
    address: ['', Validators.maxLength(250)],
    comments: ['', Validators.maxLength(250)],
    contactChannels: this.fb.array([]),
    key: this.fb.control<number | null>(null),
    active: [true],
    renew: [true]
  });

  public readonly formStatus = new FormStatus(this.form);

  @Input() public set loading(value: boolean) {
    this.formStatus.loading = value;
  }

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  public get contactChannels(): FormArray {
    return this.form.controls.contactChannels;
  }

  public addContactChannel(): void {
    this.contactChannels.push(
      this.fb.group({
        method: this.fb.control<number | null>(null, Validators.required),
        detail: ['', [Validators.required, Validators.maxLength(50)]]
      })
    );
  }

  public removeContactChannel(index: number): void {
    this.contactChannels.removeAt(index);
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (!this.saveEnabled) {
      return;
    }

    const value = this.form.getRawValue();
    const data = new MemberCreation(value.feeType!, value.identifier ?? '', value.name);
    data.birthDate = value.birthDate ?? undefined;
    data.address = value.address ?? '';
    data.comments = value.comments ?? '';
    data.contactChannels = this.contactChannels.getRawValue();
    data.key = value.key ?? undefined;
    data.active = value.active ?? true;
    data.renew = value.renew ?? true;
    this.save.emit(data);
  }

}
