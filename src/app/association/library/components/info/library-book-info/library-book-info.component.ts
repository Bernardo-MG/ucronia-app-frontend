import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Book } from '../../../models/book';
import { Language } from '@app/association/library/models/language';

@Component({
  selector: 'assoc-library-book-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-book-info.component.html'
})
export class LibraryBookInfoComponent {

  @Input() data = new Book();

  @Input() public languages: Language[] = [];

  public get language(): string {
    const language = this.languages.find(lang => lang.code === this.data.language);
    return language ? language.name : this.data.language;
  }

  public get editors(): string {
    return this.data.publishers.map(e => e.name).join(", ");
  }

  public get donors(): string {
    return this.data.donors.map(e => e.name.fullName).join(", ");
  }

  public get authors(): string {
    return this.data.authors.map(e => e.name).join(", ");
  }

}
