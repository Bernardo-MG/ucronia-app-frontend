import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryBookLendingsComponent } from '@app/association/library/components/library-book-lendings/library-book-lendings.component';
import { Book } from '@app/models/library/book';
import { Language } from '@app/models/library/language';
import { CardModule } from '@app/shared/card/card.module';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { FormModule } from '@app/shared/form/form.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
  selector: 'assoc-library-admin-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormModule, IconsModule, CardModule, LibraryBookLendingsComponent, PlaceholderDirective],
  templateUrl: './library-admin-book-details.component.html'
})
export class LibraryAdminBookDetailsComponent {

  @Input() public data = new Book();

  @Input() public showMenu = false;

  @Input() public editEnabled = false;

  @Input() public waiting = false;

  @Input() public deletable = false;

  @Input() public editable = false;

  @Input() public lendDisabled = false;

  @Input() public languages: Language[] = [];

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<string>();

  public view: string = 'details';

  public tabs = [new CardTab('details', 'Detalles'), new CardTab('donors', 'Donantes'), new CardTab('lendings', 'Préstamos')];

  public get authors(): string {
    return this.data.authors.map(e => e.name).join(", ");
  }

  public get donors(): string {
    let donors;
    if (this.data.donation) {
      donors = this.data.donation.donors.map(e => e.name.fullName).join(", ");
    } else {
      donors = '';
    }

    return donors;
  }

  public get publishers(): string {
    return this.data.publishers.map(e => e.name).join(", ");
  }

  public get language(): string {
    const language = this.languages.find(lang => lang.code === this.data.language);
    return language ? language.name : this.data.language;
  }

  public onChangeView(newView: string) {
    this.view = newView;
  }

}
