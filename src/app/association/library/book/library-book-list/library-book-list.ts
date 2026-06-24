import { Component, input, output, ViewChild } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { FictionBook, GameBook } from '@ucronia/domain';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';
import { Dialog } from '../library-dialog';

@Component({
  selector: 'assoc-library-book-list',
  imports: [TableModule, ButtonModule, BadgeModule, MenuModule],
  templateUrl: './library-book-list.html'
})
export class LibraryBookList {

  public readonly editable = input(false);
  public readonly loading = input(false);
  public readonly books = input<FictionBook[] | GameBook[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly showBook = output<FictionBook | GameBook>();
  public readonly sort = output<SortingProperty>();
  public readonly pageChange = output<number>();
  public readonly show = output<{ dialog: Dialog, book: FictionBook | GameBook }>();

  @ViewChild('fictionEditionMenu') fictionEditionMenu!: Menu;
  @ViewChild('gameEditionMenu') gameEditionMenu!: Menu;

  public fictionEditionMenuItems: MenuItem[] = [];
  public gameEditionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public openEditionMenu(event: Event, book: FictionBook | GameBook) {
    if (Object.prototype.hasOwnProperty.call(book, 'gameSystem')) {
      this.gameEditionMenuItems = [];
      this.gameEditionMenuItems.push(
        {
          label: 'Datos',
          command: () => this.show.emit({ dialog: Dialog.DETAILS, book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Donantes',
          command: () => this.show.emit({ dialog: Dialog.DONORS, book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Autores',
          command: () => this.show.emit({ dialog: Dialog.AUTHORS, book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Editor',
          command: () => this.show.emit({ dialog: Dialog.PUBLISHERS, book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Sistema',
          command: () => this.show.emit({ dialog: Dialog.GAME_SYSTEM, book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Tipo',
          command: () => this.show.emit({ dialog: Dialog.BOOK_TYPE, book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Préstamos',
          command: () => this.show.emit({ dialog: Dialog.LENDINGS, book })
        });

      this.gameEditionMenu.toggle(event);
    } else {
      this.fictionEditionMenuItems = [];
      this.fictionEditionMenuItems.push(
        {
          label: 'Datos',
          command: () => this.show.emit({ dialog: Dialog.DETAILS, book })
        });
      this.fictionEditionMenuItems.push(
        {
          label: 'Donantes',
          command: () => this.show.emit({ dialog: Dialog.DONORS, book })
        });
      this.fictionEditionMenuItems.push(
        {
          label: 'Autores',
          command: () => this.show.emit({ dialog: Dialog.AUTHORS, book })
        });
      this.fictionEditionMenuItems.push(
        {
          label: 'Editor',
          command: () => this.show.emit({ dialog: Dialog.PUBLISHERS, book })
        });
      this.fictionEditionMenuItems.push(
        {
          label: 'Préstamos',
          command: () => this.show.emit({ dialog: Dialog.LENDINGS, book })
        });

      this.fictionEditionMenu.toggle(event);
    }
  }

  public onChangeDirection(sorting: SortingEvent) {
    // TODO: should receive the actual direction, not a number
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;

    this.sort.emit(new SortingProperty(sorting.field, direction));
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.pageChange.emit(page);
  }

}
