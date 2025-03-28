import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryBookLendingsComponent } from '@app/association/library/components/library-book-lendings/library-book-lendings.component';
import { FictionBook } from '@app/models/library/fiction-book';
import { Language } from '@app/models/library/language';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { IconTakeInComponent, IconTakeOutComponent } from '@bernardo-mg/icons';
import { CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, CardNavigationComponent, CardTab, PlaceholderDirective } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-library-admin-fiction-book-details',
  imports: [CommonModule, RouterModule, LibraryBookLendingsComponent, IconTakeInComponent, IconTakeOutComponent, PlaceholderDirective, ControlButtonsComponent, CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent, CardNavigationComponent],
  templateUrl: './library-admin-fiction-book-details.component.html'
})
export class LibraryAdminFictionBookDetailsComponent {

  @Input() public data = new FictionBook();

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
