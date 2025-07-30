
import { Component, input } from '@angular/core';
import { FictionBook } from '@app/models/library/fiction-book';
import { Language } from '@app/models/library/language';
import { PlaceholderDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'assoc-library-fiction-book-details',
  imports: [PlaceholderDirective],
  templateUrl: './library-fiction-book-details.component.html'
})
export class LibraryFictionBookDetailsComponent {

  public readonly data = input(new FictionBook());

  public readonly waiting = input(false);

  public readonly languages = input<Language[]>([]);

  public get language(): string {
    const language = this.languages().find(lang => lang.code === this.data().language);
    return language ? language.name : this.data().language;
  }

  public get editors(): string {
    return this.data().publishers.map(e => e.name).join(", ");
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

  public get authors(): string {
    return this.data().authors.map(e => e.name).join(", ");
  }

}
