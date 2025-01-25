import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryBookLendingsComponent } from '@app/association/library/components/library-book-lendings/library-book-lendings.component';
import { Book } from '@app/models/library/book';
import { Language } from '@app/models/library/language';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardFooterComponent } from '@app/shared/card/components/card-footer/card-footer.component';
import { CardHeaderComponent } from '@app/shared/card/components/card-header/card-header.component';
import { CardNavigationComponent } from '@app/shared/card/components/card-navigation/card-navigation.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CardTab } from '@app/shared/card/shared/models/card-tab';
import { ControlButtonsComponent } from '@app/shared/form/components/control-buttons/control-buttons.component';
import { IconTakeInComponent } from '@app/shared/icons/components/icon-take-in/icon-take-in.component';
import { IconTakeOutComponent } from '@app/shared/icons/components/icon-take-out/icon-take-out.component';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
    selector: 'assoc-library-admin-book-details',
    imports: [CommonModule, RouterModule, LibraryBookLendingsComponent, IconTakeInComponent, IconTakeOutComponent, PlaceholderDirective, ControlButtonsComponent, CardComponent, CardBodyComponent, CardFooterComponent, CardHeaderComponent, CardNavigationComponent],
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
