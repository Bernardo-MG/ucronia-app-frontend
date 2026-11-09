import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Profile } from '@ucronia/domain';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-creation-form',
  imports: [ReactiveFormsModule, DatePickerModule, MessageModule, InputGroupModule, InputGroupAddonModule, MemberSearch],
  templateUrl: './fee-creation-form.html'
})
export class FeeCreationForm {

  public readonly failures = input(new FailureStore());

  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }
  public readonly members = input<Profile[]>([]);

  public readonly save = output<FeeCreationEvent>();
  public readonly searchMember = output<MemberSearchEvent>();
  public readonly form: FormGroup;

  public readonly formStatus: FormStatus;

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  public selectedMember?: Profile;

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      member: [null, Validators.required],
      month: [null, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public onClearMember(): void {
    this.selectedMember = undefined;
    this.form.get('member')?.reset();
    this.form.get('member')?.markAsDirty();
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.save.emit(this.form.value);
    }
  }

  public onSelectMember(member: Profile): void {
    if (!member) {
      return;
    }

    this.selectedMember = member;

    const memberControl = this.form.get('member');
    memberControl?.setValue(member.number);
    memberControl?.markAsTouched();
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property)
      || this.failures().hasFailures(property);
  }

}

export class FeeCreationEvent {
  public month = new Date();
  public member = -1;
}
