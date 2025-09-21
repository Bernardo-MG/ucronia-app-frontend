
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryBookLendings } from '@app/association/library/library-book-lendings/library-book-lendings';
import { BookType } from '@app/domain/library/book-type';
import { FictionBook } from '@app/domain/library/fiction-book';
import { GameBook } from '@app/domain/library/game-book';
import { GameSystem } from '@app/domain/library/game-system';
import { Language } from '@app/domain/library/language';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'assoc-library-admin-book-info',
  imports: [CardModule, RouterModule, SkeletonModule, PanelModule, TableModule, ButtonModule, MenuModule, ConfirmPopupModule, ToastModule, LibraryBookLendings, DatePipe],
  templateUrl: './library-admin-book-info.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminBookInfo {

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
