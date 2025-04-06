import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminDonorSelectionComponent } from '@app/association-admin/library-admin/donor/components/library-admin-donor-selection/library-admin-donor-selection.component';
import { Donation } from '@app/models/library/donation';
import { Donor } from '@app/models/library/donor';
import { GameBook } from '@app/models/library/game-book';
import { Person } from '@app/models/person/person';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { FormComponent, InputFailureFeedbackComponent, InvalidFieldDirective, SaveControlsComponent } from '@bernardo-mg/form';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { PaginatedResponse } from '@bernardo-mg/request';

@Component({
  selector: 'assoc-library-admin-book-donors-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SaveControlsComponent, LibraryAdminDonorSelectionComponent, IconAddComponent, IconDeleteComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
  templateUrl: './library-admin-book-donors-form.component.html'
})
export class LibraryAdminBookDonorsFormComponent extends FormComponent<GameBook> {

  @Input() public donors = new PaginatedResponse<Person>();

  @Output() public goToDonorPage = new EventEmitter<number>();

  public selectingDonor = false;

  public get donation(): Donation | undefined {
    return this.form.get('donation').value;
  }

  public set donation(data: Donation) {
    this.form.get('donation')?.setValue(data);
  }

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      number: [undefined],
      index: [-1],
      isbn: ['', isbnValidator()],
      title: fb.group({
        supertitle: [''],
        title: ['', Validators.required],
        subtitle: ['']
      }),
      language: ['', Validators.required],
      publishDate: [''],
      authors: [[]],
      donation: fb.group({
        date: [''],
        donors: [[]]
      }),
      bookType: [],
      publishers: [[]],
      gameSystem: []
    });
  }

  public onStartSelectingDonor() {
    this.selectingDonor = true;
  }

  public onSelectDonor(donor: Person) {
    if (!this.donation) {
      this.donation = new Donation();
    }

    if (!this.donation.donors.find(d => d.number === donor.number)) {
      this.donation.donors.push(donor);
    }
    this.selectingDonor = false;
  }

  public onRemoveDonor(donor: Donor) {
    if (!this.donation) {
      this.donation = new Donation();
    }

    this.donation.donors = this.donation.donors.filter(d => d.number !== donor.number);
  }

  public onGoToDonorPage(page: number) {
    this.goToDonorPage.emit(page);
  }

}
