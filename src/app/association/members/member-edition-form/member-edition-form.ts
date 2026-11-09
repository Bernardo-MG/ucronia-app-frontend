import { Component, inject, input, Input, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { MemberUpdate } from '@ucronia/api';
import { ContactMethod, FeeType, Member } from '@ucronia/domain';
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
  selector: 'assoc-member-edition-form',
  imports: [ReactiveFormsModule, ButtonModule, DatePickerModule, InputGroupModule, InputGroupAddonModule, InputTextModule, MessageModule, SelectModule, TextareaModule, ToggleSwitchModule],
  templateUrl: './member-edition-form.html'
})
export class MemberEditionForm {

  private readonly fb = inject(FormBuilder);

  public readonly contactMethods = input<ContactMethod[]>([]);
  @Input() public set data(member: Member) {
    this.form.reset({
      feeType: member.feeType.number,
      identifier: member.identifier ?? '',
      name: {
        firstName: member.name.firstName,
        nickname: member.name.nickname ?? '',
        lastName: member.name.lastName ?? ''
      },
      birthDate: member.birthDate ?? null,
      address: member.address ?? '',
      comments: member.comments ?? '',
      active: member.active,
      renew: member.renew
    });
    this.contactChannels.clear();
    for (const channel of member.contactChannels ?? []) {
      this.addContactChannel();
      this.contactChannels
        .at(this.contactChannels.length - 1)
        .setValue({ method: channel.method.number, detail: channel.detail });
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
  public readonly failures = input(new FailureStore());
  public readonly feeTypes = input<FeeType[]>([]);
  public readonly formId = input<string | null>(null);
  @Input() public set loading(value: boolean) {
    this.formStatus.loading = value;
  }

  public readonly save = output<MemberUpdate>();

  public get contactChannels(): FormArray {
    return this.form.controls.contactChannels;
  }
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
    active: [true],
    renew: [true]
  });
  public readonly formStatus = new FormStatus(this.form);
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
  public readonly today = new Date();

  // Event handlers
  protected addContactChannel(): void {
    this.contactChannels.push(
      this.fb.group({
        method: this.fb.control<number | null>(null, Validators.required),
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
    const data: MemberUpdate = {
      feeType: value.feeType!,
      name: value.name,
      identifier: value.identifier ?? '',
      birthDate: value.birthDate ?? undefined,
      address: value.address ?? '',
      comments: value.comments ?? '',
      contactChannels: this.contactChannels.getRawValue(),
      active: value.active ?? false,
      renew: value.renew ?? false
    };
    this.save.emit(data);
  }

  // Public methods
  public removeContactChannel(index: number): void {
    this.contactChannels.removeAt(index);
  }

  // Protected methods
  protected isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}
