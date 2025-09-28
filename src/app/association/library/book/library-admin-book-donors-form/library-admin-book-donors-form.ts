
import { Component, inject, Input, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Donation } from '@app/domain/library/donation';
import { Donor } from '@app/domain/library/donor';
import { NameNumber } from '@app/shared/data/model/name-number';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { FormStatus } from '@bernardo-mg/form';
import { FailureStore, PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'assoc-library-admin-book-donors-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, FloatLabelModule, MessageModule, ButtonModule, SelectionList],
  templateUrl: './library-admin-book-donors-form.html'
})
export class LibraryAdminBookDonorsForm implements OnInit, OnChanges {

  public readonly loading = input(false);

  public readonly failures = input(new FailureStore());

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Donor>>>((page: number) => EMPTY);

  @Input() public set data(value: Donation | undefined) {
    this.form.patchValue(value as any);
  }

  public readonly save = output<Donation>();

  public formStatus: FormStatus;

  public form: FormGroup;

  public get donors(): Donor[] {
    return this.form.get('donors')?.value;
  }

  public selectingDonor = false;

  public selection = new PaginatedResponse<Donor>();

  constructor() {
    const fb = inject(FormBuilder);

    this.form = fb.group({
      date: ["", Validators.required],
      donors: [[], Validators.required]
    });

    this.formStatus = new FormStatus(this.form);
  }

  public ngOnInit(): void {
    this.onGoToSelectionPage(0);
  }

  public ngOnChanges({ loading }: SimpleChanges): void {
    if (loading) {
      this.formStatus.loading = this.loading();
    }
  }

  public onGoToSelectionPage(page: number) {
    this.getSelection()(page)
      .subscribe(response => this.selection = response);
  }

  public onStartSelectingDonor() {
    this.selectingDonor = true;
  }

  public onSelect(donor: NameNumber) {
    if (!this.donors.find(d => d.number === donor.number)) {
      this.form.get('donors')?.setValue([...this.donors, donor]);
    }
    this.selectingDonor = false;
  }

  public onRemoveDonor(donor: Donor) {
    const filteredDonors = this.donors.filter(d => d.number !== donor.number);
    this.form.get('donors')?.setValue(filteredDonors);
  }

  public readonly nameRenderer = (row: Donor): string => row.name.fullName;

  /**
   * Handler for the save event.
   */
  public onSave() {
    if (this.form.valid) {
      // Valid form, can emit data
      this.save.emit(this.form.value);
    }
  }

  public isFieldInvalid(property: string): boolean {
    return this.formStatus.isFormFieldInvalid(property) || (this.failures().hasFailures(property));
  }

}
