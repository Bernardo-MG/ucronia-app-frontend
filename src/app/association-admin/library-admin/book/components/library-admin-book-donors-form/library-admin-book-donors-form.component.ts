
import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminDonorSelectionComponent } from '@app/association-admin/library-admin/donor/components/library-admin-donor-selection/library-admin-donor-selection.component';
import { Donation } from '@app/models/library/donation';
import { Donor } from '@app/models/library/donor';
import { Person } from '@app/models/person/person';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-library-admin-book-donors-form',
  imports: [FormsModule, ReactiveFormsModule, SaveControlsComponent, LibraryAdminDonorSelectionComponent, IconAddComponent, IconDeleteComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-book-donors-form.component.html'
})
export class LibraryAdminBookDonorsFormComponent extends FormComponent<Donation> {

  public readonly donors = input(new PaginatedResponse<Person>());

  public readonly goToDonorPage = output<number>();

  public selectingDonor = false;

  public currentDonors: Donor[] = [];

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
    if (!this.currentDonors.find(d => d.number === donor.number)) {
      this.currentDonors = [...this.currentDonors, donor];
      this.form.get('donors').setValue(this.currentDonors);
    }
    this.selectingDonor = false;
  }

  public onRemoveDonor(donor: Donor) {
    this.currentDonors = this.currentDonors.filter(d => d.number !== donor.number);
    this.form.get('donors').setValue(this.currentDonors);
  }

  public onGoToDonorPage(page: number) {
    this.goToDonorPage.emit(page);
  }

}
