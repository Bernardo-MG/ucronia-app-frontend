
import { Component, EventEmitter, Output, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryBookLendingsComponent } from '@app/association/library/components/library-book-lendings/library-book-lendings.component';
import { GameBook } from '@app/models/library/game-book';
import { Language } from '@app/models/library/language';
import { ControlButtonsComponent } from '@bernardo-mg/form';
import { IconTakeInComponent, IconTakeOutComponent } from '@bernardo-mg/icons';
import { CardNavigationComponent, CardTab, PlaceholderDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'assoc-library-admin-game-book-details',
  imports: [CardModule, RouterModule, LibraryBookLendingsComponent, IconTakeInComponent, IconTakeOutComponent, PlaceholderDirective, ControlButtonsComponent, CardNavigationComponent],
  templateUrl: './library-admin-game-book-details.component.html'
})
export class LibraryAdminGameBookDetailsComponent {

  public readonly data = input(new GameBook());

  public readonly showMenu = input(false);

  public readonly editEnabled = input(false);

  public readonly waiting = input(false);

  public readonly deletable = input(false);

  public readonly editable = input(false);

  public readonly lendDisabled = input(false);

  public readonly languages = input<Language[]>([]);

  @Output() public delete = new EventEmitter<void>();

  @Output() public startEditing = new EventEmitter<string>();

  public view: string = 'details';

  public tabs = [new CardTab('details', 'Detalles'), new CardTab('donors', 'Donantes'), new CardTab('lendings', 'Préstamos')];

  public get authors(): string {
    return this.data().authors.map(e => e.name).join(", ");
  }

  public get donors(): string {
    let donors;
    const data = this.data();
    if (data.donation) {
      donors = data.donation.donors.map(e => e.name.fullName).join(", ");
    } else {
      donors = '';
    }

    return donors;
  }

  public get publishers(): string {
    return this.data().publishers.map(e => e.name).join(", ");
  }

  public get language(): string {
    const language = this.languages().find(lang => lang.code === this.data().language);
    return language ? language.name : this.data().language;
  }

  public onChangeView(newView: string) {
    this.view = newView;
  }

}
