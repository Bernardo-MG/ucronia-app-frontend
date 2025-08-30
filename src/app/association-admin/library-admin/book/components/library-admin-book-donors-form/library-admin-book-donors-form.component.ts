
import { Component, inject, Input, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminDonorSelectionComponent } from '@app/association-admin/library-admin/donor/components/library-admin-donor-selection/library-admin-donor-selection.component';
import { Donation } from '@app/domain/library/donation';
import { Donor } from '@app/domain/library/donor';
import { Person } from '@app/domain/person/person';
import { FormComponent, SaveControlsComponent } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-library-admin-book-donors-form',
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, DatePickerModule, FloatLabelModule, MessageModule, SaveControlsComponent, LibraryAdminDonorSelectionComponent, IconAddComponent, IconDeleteComponent],
  templateUrl: './library-admin-book-donors-form.component.html'
})
export class LibraryAdminBookDonorsFormComponent extends FormComponent<Donation | undefined> {

  public readonly donorsSelection = input(new PaginatedResponse<Person>());

  public readonly goToDonorPage = output<number>();

  @Input() public override set data(value: Donation | undefined) {
    if (value) {
      this.loadData(value);
    }
  }

  public get donors(): Donor[] {
    return this.form.get('donors').value;
  }

  public selectingDonor = false;

  constructor() {
    const fb = inject(FormBuilder);

    super();

    this.form = fb.group({
      date: ["", Validators.required],
      donors: [[], Validators.required]
    });
  }

  public onStartSelectingDonor() {
    this.selectingDonor = true;
  }

  public onSelectDonor(donor: Person) {
    if (!this.donors.find(d => d.number === donor.number)) {
      this.form.get('donors').setValue([...this.donors, donor]);
    }
    this.selectingDonor = false;
  }

  public onRemoveDonor(donor: Donor) {
    const filteredDonors = this.donors.filter(d => d.number !== donor.number);
    this.form.get('donors').setValue(filteredDonors);
  }

  public onGoToDonorPage(page: number) {
    this.goToDonorPage.emit(page);
  }

}
