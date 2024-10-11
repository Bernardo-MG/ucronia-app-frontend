import { CommonModule, } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Book } from '@app/models/library/book';
import { Language } from '@app/models/library/language';
import { FormComponent } from '@app/shared/form/components/form/form.component';
import { SaveControlsComponent } from '@app/shared/form/components/save-controls/save-controls.component';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ModalComponent } from '@app/shared/layout/components/modal/modal.component';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { isbnValidator } from '@app/shared/validator/isbn.validator';
import { LibraryAdminAuthorSelectionComponent } from '../../author/library-admin-author-selection/library-admin-author-selection.component';
import { LibraryAdminBookTypeSelectionComponent } from '../../book-type/library-admin-book-type-selection/library-admin-book-type-selection.component';
import { LibraryAdminDonorSelectionComponent } from '../../donor/library-admin-donor-selection/library-admin-donor-selection.component';
import { LibraryAdminGameSystemSelectionComponent } from '../../game-system/library-admin-game-system-selection/library-admin-game-system-selection.component';
import { LibraryAdminPublisherSelectionComponent } from '../../publisher/library-admin-publisher-selection/library-admin-publisher-selection.component';

@Component({
  selector: 'assoc-library-admin-book-edit-form',
  standalone: true,
  imports: [CommonModule, FormModule, IconsModule, WaitingButtonComponent, LibraryAdminGameSystemSelectionComponent, LibraryAdminBookTypeSelectionComponent, LibraryAdminPublisherSelectionComponent, LibraryAdminAuthorSelectionComponent, LibraryAdminDonorSelectionComponent, ModalComponent, SaveControlsComponent, JustifyCenterDirective],
  templateUrl: './library-admin-book-edit-form.component.html'
})
export class LibraryAdminBookEditFormComponent extends FormComponent<Book> {

  @Input() public override set data(value: Book) {
    this.loadData(value);
  }

  @Input() public languages: Language[] = [];

  public selector = '';

  constructor(
    fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      number: [undefined],
      index: [-1],
      isbn: ['', isbnValidator()],
      title: ['', Validators.required],
      language: ['', Validators.required]
    });
  }

}
