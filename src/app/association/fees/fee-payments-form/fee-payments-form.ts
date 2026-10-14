import { Component, inject, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Profile } from '@ucronia/domain';
import { isSameMonth } from 'date-fns';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-fee-payments-form',
  imports: [DrawerFormActions, ReactiveFormsModule, ButtonModule, DatePickerModule, MessageModule, InputGroupModule, InputGroupAddonModule, MemberSearch],
  templateUrl: './fee-payments-form.html'
})
export class FeePaymentsForm implements OnChanges {

  private fb = inject(FormBuilder);

  public readonly formId = input<string | null>(null);
  public readonly showActions = input(true);

  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());
  public readonly members = input<Profile[]>([]);

  public readonly save = output<FeesPaymentEvent>();
  public readonly cancelEdition = output<void>();
  public readonly searchMember = output<MemberSearchEvent>();

  public selectedMember?: Profile;

  public formStatus: FormStatus;

  public form: FormGroup;

  public today = new Date();

  public get months(): FormArray {
    return this.form.get('months') as FormArray;
  }

  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  constructor() {
    this.form = this.fb.group({
      paymentDate: [null, Validators.required],
      member: [null, Validators.required],
      months: this.fb.array([], Validators.required)
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public onSelectMember(member: Profile) {
    if (!member) {
      return;
    }

    this.selectedMember = member;
    this.form.get('member')?.setValue(member.number);
    this.form.get('member')?.markAsTouched();

    if (this.months.length === 0) {
      this.addDate();
    }
  }

  public addDate() {
    this.months.push(this.fb.control(undefined, Validators.required));
  }

  public removeDate(index: number): void {
    this.months.removeAt(index);
  }

  public onMonthSelect(date: Date, index: number) {
    const controlValue = this.months.at(index).value;

    const currentDate = controlValue instanceof Date
      ? controlValue
      : new Date(controlValue);

    if (!isSameMonth(currentDate, date)) {
      this.months.at(index).setValue(date, { emitEvent: false });
    }
  }

  /**
   * Handler for the save event.
   */
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

export class FeesPaymentEvent {
  public member = 0;
  public paymentDate = { date: new Date() };
  public months: Date[] = [];
}
