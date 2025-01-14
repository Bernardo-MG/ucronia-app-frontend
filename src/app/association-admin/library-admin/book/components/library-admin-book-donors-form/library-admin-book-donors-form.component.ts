import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LibraryAdminDonorSelectionComponent } from '@app/association-admin/library-admin/donor/components/library-admin-donor-selection/library-admin-donor-selection.component';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Book } from '@app/models/library/book';
import { Donation } from '@app/models/library/donation';
import { Donor } from '@app/models/library/donor';
import { Person } from '@app/models/person/person';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { ModalHandler } from '@app/shared/layout/utils/ModalHandler';
import { isbnValidator } from '@app/shared/validator/isbn.validator';

@Component({
  selector: 'assoc-library-admin-book-donors-form',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, ModalComponent, SaveControlsComponent, LibraryAdminDonorSelectionComponent],
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
