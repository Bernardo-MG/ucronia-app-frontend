import { Component, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Profile } from '@ucronia/domain';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-creation-form',
  imports: [DrawerFormActions, ReactiveFormsModule, DatePickerModule, MessageModule, InputGroupModule, InputGroupAddonModule, MemberSearch],
  templateUrl: './fee-creation-form.html'
})
export class FeeCreationForm implements OnChanges {

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly members = input<Profile[]>([]);

  public readonly save = output<FeeCreationEvent>();
  public readonly cancelEdition = output<void>();
  public readonly searchMember = output<MemberSearchEvent>();

  public selectedMember?: Profile;

  public formStatus: FormStatus;
  public form: FormGroup;

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      member: [null, Validators.required],
      month: [null, Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property)
      || this.failures().hasFailures(property);
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

}

export class FeeCreationEvent {
  public month = new Date();
  public member = -1;
}
