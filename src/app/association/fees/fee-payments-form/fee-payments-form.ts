import { Component, inject, input, Input, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
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
  imports: [ReactiveFormsModule, ButtonModule, DatePickerModule, MessageModule, InputGroupModule, InputGroupAddonModule, MemberSearch],
  templateUrl: './fee-payments-form.html'
})
export class FeePaymentsForm {

  private readonly formBuilder = inject(FormBuilder);

  public readonly failures = input(new FailureStore());
  public readonly formId = input<string | null>(null);
  @Input() public set loading(loading: boolean) {
    this.formStatus.loading = loading;
  }
  public readonly members = input<Profile[]>([]);

  public readonly save = output<FeesPaymentEvent>();
  public readonly searchMember = output<MemberSearchEvent>();

  public readonly form: FormGroup;
  public readonly formStatus: FormStatus;
  public get months(): FormArray {
    return this.form.get('months') as FormArray;
  }
  public get saveEnabled(): boolean {
    return this.formStatus.saveEnabled;
  }

  protected selectedMember?: Profile;
  protected readonly today = new Date();

  public constructor() {
    this.form = this.formBuilder.group({
      paymentDate: [null, Validators.required],
      member: [null, Validators.required],
      months: this.formBuilder.array([], Validators.required)
    });

    this.formStatus = new FormStatus(this.form);
  }

  // Event handlers
  public addDate() {
    this.months.push(this.formBuilder.control(undefined, Validators.required));
  }

  protected onClearMember(): void {
    this.selectedMember = undefined;
    this.form.get('member')?.reset();
    this.form.get('member')?.markAsDirty();
  }

  protected onMonthSelect(date: Date, index: number) {
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
  protected onSave(): void {
    this.form.markAllAsTouched();

    if (this.saveEnabled) {
      this.save.emit(this.form.value);
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

  public removeDate(index: number): void {
    this.months.removeAt(index);
  }

  // Protected methods
  protected isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || this.failures().hasFailures(property);
  }

}

export class FeesPaymentEvent {
  public member = 0;
  public paymentDate = { date: new Date() };
  public months: Date[] = [];
}
