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

  public getLanguage(code: string): string {
    const language = this.languages.find(lang => lang.code === code);
    return language ? language.name : code;
  }

}
