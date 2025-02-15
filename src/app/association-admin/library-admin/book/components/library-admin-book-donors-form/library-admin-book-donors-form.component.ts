import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibraryAdminDonorSelectionComponent } from '@app/association-admin/library-admin/donor/components/library-admin-donor-selection/library-admin-donor-selection.component';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Book } from '@app/models/library/book';
import { Donation } from '@app/models/library/donation';
import { Donor } from '@app/models/library/donor';
import { Person } from '@app/models/person/person';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { InputFailureFeedbackComponent } from '@app/shared/form/components/input-failure-feedback/input-failure-feedback.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { InvalidFieldDirective } from '@app/shared/form/directives/invalid-field.directive';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { IconAddComponent, IconDeleteComponent } from '@bernardo-mg/icons';
import { ModalHandler } from '@bernardo-mg/layout';

@Component({
    selector: 'assoc-library-admin-book-donors-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalComponent, SaveControlsComponent, LibraryAdminDonorSelectionComponent, IconAddComponent, IconDeleteComponent, InputFailureFeedbackComponent, InvalidFieldDirective],
    templateUrl: './library-admin-book-donors-form.component.html'
})
export class LibraryAdminBookDonorsFormComponent extends FormComponent<Book> {

  @Input() public donors = new PaginatedResponse<Person[]>([]);

  @Output() public goToDonorPage = new EventEmitter<number>();

  public get donation(): Donation | undefined {
    return this.form.get('donation').value;
  }

  public set donation(data: Donation) {
    this.form.get('donation')?.setValue(data);
  }

  private modalHandler = new ModalHandler();

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

  public onShowDonorSelection() {
    this.modalHandler.openModal('donor');
  }

  public onSelectDonor(donor: Person) {
    if (!this.donation) {
      this.donation = new Donation();
    }

    if (!this.donation.donors.find(d => d.number === donor.number)) {
      this.donation.donors.push(donor);
    }
    this.modalHandler.closeModal('donor');
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
