import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '@app/models/library/book';
import { Language } from '@app/models/library/language';
import { PlaceholderDirective } from '@app/shared/layout/directives/placeholder.directive';

@Component({
  selector: 'assoc-library-book-details',
  standalone: true,
  imports: [CommonModule, PlaceholderDirective],
  templateUrl: './library-book-details.component.html'
})
export class LibraryBookDetailsComponent {

  @Input() data = new Book();

  @Input() waiting = false;

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
