import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FictionBook } from '@app/domain/library/fiction-book';
import { Language } from '@app/domain/library/language';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { BookService } from '../book-service';
import { LibraryBookLendings } from '../library-book-lendings/library-book-lendings';

@Component({
  selector: 'assoc-library-fiction-book-info',
  imports: [CommonModule, CardModule, SkeletonModule, LibraryBookLendings, ResponsiveShortColumnsDirective],
  templateUrl: './library-fiction-book-info.html'
})
export class LibraryFictionBookInfo {

  private readonly service = inject(BookService);

  public readonly languages: Language[] = [];

  /**
   * Reading flag. Active while the data is being read.
   */
  public loading = false;

  public data = new FictionBook();

  public get language(): string {
    const language = this.languages.find(lang => lang.code === this.data.language);
    return language ? language.name : this.data.language;
  }

  public get authors(): string {
    return this.data.authors.map(e => e.name).join(", ");
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

  constructor() {
    const route = inject(ActivatedRoute);


    // Get id
    route.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if (indexParam) {
        const index = Number(indexParam);
        this.load(index);
      }
    });

    // Load languages
    this.languages = this.service.getLanguages();
  }

  private load(index: number): void {
    this.loading = true;
    this.service.getOneFictionBook(index)
      .subscribe({
        next: response => {
          this.data = response;
          this.loading = false;
        },
        error: error => {
          this.loading = false;
        }
      });
  }

}
