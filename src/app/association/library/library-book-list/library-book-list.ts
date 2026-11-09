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

  public readonly books = input<FictionBook[] | GameBook[]>([]);
  public readonly editable = input(false);
  public readonly loading = input(false);
  public readonly page = input(0);
  public readonly rows = input(0);
  public readonly totalRecords = input(0);

  public readonly pageChange = output<number>();
  public readonly show = output<{ dialog: Dialog, book: FictionBook | GameBook }>();
  public readonly showBook = output<FictionBook | GameBook>();
  public readonly sort = output<SortingProperty>();

  @ViewChild('editionMenu') public readonly editionMenu!: Menu;
  public editionMenuItems: MenuItem[] = [];
  public get first() {
    return (this.page() - 1) * this.rows();
  }

  // Event handlers
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

  public openEditionMenu(event: Event, book: FictionBook | GameBook) {
    event.stopPropagation();
    this.editionMenuItems = [];

    if (this.editable()) {
      this.editionMenuItems.push({
        label: book.lent ? 'Devolver' : 'Prestar',
        icon: book.lent ? 'pi pi-undo' : 'pi pi-arrow-right',
        command: () => this.show.emit({ dialog: Dialog.LENDINGS, book })
      });
    }

    this.editionMenu.toggle(event);
  }

  // Public methods
  public getAuthors(book: FictionBook | GameBook): string {
    return book.authors.map(author => author.name).join(', ') || 'Autor desconocido';
  }

  public getSystem(book: FictionBook | GameBook): string {
    return 'gameSystem' in book ? book.gameSystem?.name || '' : '';
  }

  public getType(book: FictionBook | GameBook): string {
    return 'bookType' in book ? book.bookType?.name || 'Juego' : 'Ficción';
  }

}
