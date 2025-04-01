import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GameBook } from '@app/models/library/game-book';
import { Language } from '@app/models/library/language';
import { PlaceholderDirective } from '@bernardo-mg/layout';

@Component({
  selector: 'assoc-library-game-book-details',
  imports: [CommonModule, PlaceholderDirective],
  templateUrl: './library-game-book-details.component.html'
})
export class LibraryGameBookDetailsComponent {

  @Input() public data = new GameBook();

  @Input() public waiting = false;

  @Input() public languages: Language[] = [];

  public get language(): string {
    const language = this.languages.find(lang => lang.code === this.data.language);
    return language ? language.name : this.data.language;
  }

  public get editors(): string {
    return this.data.publishers.map(e => e.name).join(", ");
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

  public get authors(): string {
    return this.data.authors.map(e => e.name).join(", ");
  }

}
