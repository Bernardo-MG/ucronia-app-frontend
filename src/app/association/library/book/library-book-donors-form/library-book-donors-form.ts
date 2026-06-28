
import { Component, inject, Input, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberSearch, MemberSearchEvent } from '@app/shared/member/member-search/member-search';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore } from '@bernardo-mg/request';
import { Donation, Donor } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-book-donors-form',
  imports: [FormsModule, ReactiveFormsModule, DatePickerModule, FloatLabelModule, MessageModule, ButtonModule, MemberSearch],
  templateUrl: './library-book-donors-form.html'
})
export class LibraryBookDonorsForm implements OnChanges {
  public readonly loading = input(false);
  public readonly failures = input(new FailureStore());

  public readonly donors = input<Donor[]>([]);

  public readonly save = output<Donation>();
  public readonly searchDonor = output<MemberSearchEvent>();
  public donorSearchValue = new Donor();

  @Input() public set data(value: Donation | undefined) {
    if (value) {
      this.form.patchValue(value as any);
    }
  }

  public formStatus: FormStatus;
  public form: FormGroup;

  public get selectedDonors(): Donor[] {
    return this.form.get('donors')?.value ?? [];
  }

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      date: ['', Validators.required],
      donors: [[], Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public onSelectMember(member: Donor): void {
    if (!member) {
      return;
    }

    if (!this.selectedDonors.find(d => d.number === member.number)) {
      this.form.get('donors')?.setValue([...this.selectedDonors, member]);
    }

    this.donorSearchValue = new Donor();
  }

  public onRemoveDonor(donor: Donor): void {
    this.form.get('donors')?.setValue(
      this.selectedDonors.filter(d => d.number !== donor.number)
    );
  }

  public onSave(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property)
      || this.failures().hasFailures(property);
  }
}
