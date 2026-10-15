import { DatePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { BookLending, BookType, FictionBook, GameBook, GameSystem, Language } from '@ucronia/domain';
import { SkeletonModule } from 'primeng/skeleton';
import { LibraryBookLendings } from '../library-book-lendings/library-book-lendings';
import { LibraryConfig } from '../library-config';

@Component({
  selector: 'assoc-library-book-info',
  imports: [AuditInfo, SkeletonModule, LibraryBookLendings, DatePipe],
  templateUrl: './library-book-info.html'
})
export class LibraryBookInfo {

  private readonly config = inject(LibraryConfig);

  public readonly loading = input(false);
  public readonly showLending = output<BookLending>();
  public readonly book = input<FictionBook | GameBook>(new GameBook());
  public readonly borrowerNames = input<Record<number, string>>({});

  public languages: Language[] = this.config.getLanguages();

  public get isGame(): boolean {
    return Object.prototype.hasOwnProperty.call(this.book(), 'gameSystem');
  }

  public get authors(): string {
    return this.book().authors.map(author => author.name).join(', ');
  }

  public get publishers(): string {
    return this.book().publishers.map(publisher => publisher.name).join(', ');
  }

  public get language(): string {
    const language = this.languages.find(item => item.code === this.book().language);
    return language ? language.name : this.book().language;
  }

  public get bookType(): BookType | undefined {
    if (this.isGame) {
      return (this.book() as GameBook).bookType;
    }

    return undefined;
  }

  public get gameSystem(): GameSystem | undefined {
    if (this.isGame) {
      return (this.book() as GameBook).gameSystem;
    }

    return undefined;
  }

  public get donors(): string {
    const donation = this.book().donation;

    if (!donation) {
      return '';
    }

    return donation.donors.map(donor => donor.name.fullName).join(', ');
  }

}