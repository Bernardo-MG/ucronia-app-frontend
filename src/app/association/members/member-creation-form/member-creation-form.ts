import { Component, inject, input, Input, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { MemberCreation } from '@ucronia/api';
import { ContactMethod, FeeType } from '@ucronia/domain';
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
  imports: [ReactiveFormsModule, ButtonModule, DatePickerModule, InputGroupModule, InputGroupAddonModule, InputTextModule, MessageModule, SelectModule, TextareaModule, ToggleSwitchModule],
  templateUrl: './member-creation-form.html'
})
export class MemberCreationForm {

  private readonly formBuilder = inject(FormBuilder);

  public readonly contactMethods = input<ContactMethod[]>([]);
  public readonly failures = input(new FailureStore());
  public readonly feeTypes = input<FeeType[]>([]);
  public readonly formId = input<string | null>(null);
  @Input() public set loading(value: boolean) {
    this.formStatus.loading = value;
  }

  public readonly save = output<MemberCreation>();

  public get contactChannels(): FormArray {
    return this.form.controls.contactChannels;
  }
  public readonly form = this.formBuilder.group({
    feeType: this.formBuilder.control<number | null>(null, Validators.required),
    identifier: ['', [Validators.maxLength(15)]],
    name: this.formBuilder.nonNullable.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      nickname: ['', Validators.maxLength(50)],
      lastName: ['', Validators.maxLength(50)]
    }),
    birthDate: this.formBuilder.control<Date | null>(null),
    address: ['', Validators.maxLength(250)],
    comments: ['', Validators.maxLength(250)],
    contactChannels: this.formBuilder.array([]),
    active: [true],
    renew: [true]
  });
  public readonly formStatus = new FormStatus(this.form);
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
  public readonly today = new Date();

  // Event handlers
  public addContactChannel(): void {
    this.contactChannels.push(
      this.formBuilder.group({
        method: this.formBuilder.control<number | null>(null, Validators.required),
        detail: ['', [Validators.required, Validators.maxLength(50)]]
      })
    );
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
    data.active = value.active ?? true;
    data.renew = value.renew ?? true;
    this.save.emit(data);
  }

  public removeContactChannel(index: number): void {
    this.contactChannels.removeAt(index);
  }

  // Protected methods
  protected isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}
