
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Donation } from '@app/domain/library/donation';
import { Donor } from '@app/domain/library/donor';
import { NameNumber } from '@app/shared/data/model/name-number';
import { SelectionList } from '@app/shared/data/selection-list/selection-list';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'assoc-library-admin-book-donors-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, FloatLabelModule, MessageModule, ButtonModule, SaveControlsComponent, SelectionList],
  templateUrl: './library-admin-book-donors-form.html'
})
export class LibraryAdminBookDonorsForm extends FormComponent<Donation | undefined> implements OnInit {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<Donor>>>((page: number) => EMPTY);

  @Input() public override set data(value: Donation | undefined) {
    if (value) {
      this.loadData(value);
    }
  }

  public get donors(): Donor[] {
    return this.form.get('donors').value;
  }

  public selectingDonor = false;

  public selection = new PaginatedResponse<Donor>();

  constructor() {
    super();

    const fb = inject(FormBuilder);

    this.form = fb.group({
      date: ["", Validators.required],
      donors: [[], Validators.required]
    });
  }

  public ngOnInit(): void {
    this.onGoToSelectionPage(0);
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
      this.form.get('donors').setValue([...this.donors, donor]);
    }
    this.selectingDonor = false;
  }

  public onRemoveDonor(donor: Donor) {
    const filteredDonors = this.donors.filter(d => d.number !== donor.number);
    this.form.get('donors').setValue(filteredDonors);
  }

  public readonly nameRenderer = (row: Donor): string => row.name.fullName;

}
