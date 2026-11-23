import { Component, inject, input, Input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent, MemberSearchOption } from '@app/shared/member/member-search/member-search';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { DatePickerModule } from '@openng/optimus-ui/datepicker';
import { InputGroupModule } from '@openng/optimus-ui/inputgroup';
import { InputGroupAddonModule } from '@openng/optimus-ui/inputgroupaddon';
import { MessageModule } from '@openng/optimus-ui/message';

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
  public readonly members = input<MemberSearchOption[]>([]);

  public readonly save = output<FeeCreationEvent>();
  public readonly searchMember = output<MemberSearchEvent>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }
  public selectedMember?: MemberSearchOption;

  public constructor() {
    const formBuilder = inject(FormBuilder);

    this.form = formBuilder.group({
      member: [null, Validators.required],
      month: [null, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  // Event handlers
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

  public onSelectMember(member: MemberSearchOption): void {
    if (!member) {
      return;
    }

    this.selectedMember = member;

    const memberControl = this.form.get('member');
    memberControl?.setValue(member.number);
    memberControl?.markAsTouched();
  }

  // Public methods
  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property)
      || this.failures().hasFailures(property);
  }

}

export class FeeCreationEvent {
  public month = new Date();
  public member = -1;
}
