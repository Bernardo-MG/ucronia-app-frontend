
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { BookType } from '@app/domain/library/book-type';
import { FictionBook } from '@app/domain/library/fiction-book';
import { GameBook } from '@app/domain/library/game-book';
import { GameSystem } from '@app/domain/library/game-system';
import { Language } from '@app/domain/library/language';
import { SkeletonModule } from 'primeng/skeleton';
import { LibraryBookLendings } from '../library-book-lendings/library-book-lendings';

@Component({
  selector: 'assoc-library-book-info',
  imports: [SkeletonModule, LibraryBookLendings, DatePipe],
  templateUrl: './library-book-info.html'
})
export class LibraryBookInfo {

  public readonly book = input<FictionBook | GameBook>(new GameBook());

  public languages: Language[] = [];

  public get authors(): string {
    return this.book().authors.map(e => e.name).join(", ");
  }

  public get publishers(): string {
    return this.book().publishers.map(e => e.name).join(", ");
  }

  public get language(): string {
    const language = this.languages.find(lang => lang.code === this.book().language);
    return language ? language.name : this.book().language;
  }

  public get bookType(): BookType | undefined {
    if (Object.prototype.hasOwnProperty.call(this.book(), 'bookType')) {
      return (this.book() as GameBook).bookType;
    } else {
      return undefined;
    }
  }

  public get gameSystem(): GameSystem | undefined {
    if (Object.prototype.hasOwnProperty.call(this.book(), 'gameSystem')) {
      return (this.book() as GameBook).gameSystem;
    } else {
      return undefined;
    }
  }

  public get donors(): string {
    let donors;
    const data = this.book();
    if (data.donation) {
      donors = data.donation.donors.map(e => e.name.fullName).join(", ");
    } else {
      donors = '';
    }

    return donors;
  }

}
