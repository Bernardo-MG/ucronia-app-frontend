
import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminListSelection } from '@app/association-admin/library-admin/common/library-admin-list-selection/library-admin-list-selection';
import { Donation } from '@app/domain/library/donation';
import { Donor } from '@app/domain/library/donor';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { EMPTY, Observable } from 'rxjs';
import { NameNumber } from '../../common/model/name-number';

@Component({
  selector: 'assoc-library-admin-book-donors-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, FloatLabelModule, MessageModule, SaveControlsComponent, IconAddComponent, IconDeleteComponent, LibraryAdminListSelection],
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
    this.getSelection()(page).subscribe({
      next: response => {
        this.selection = response;
      },
      error: error => {
      }
    });
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
