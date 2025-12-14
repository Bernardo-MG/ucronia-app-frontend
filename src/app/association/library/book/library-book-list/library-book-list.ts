import { Component, inject, input, output, ViewChild } from '@angular/core';
import { FictionBook } from "@ucronia/domain";
import { GameBook } from "@ucronia/domain";
import { SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-library-book-list',
  imports: [TableModule, ButtonModule, BadgeModule, MenuModule],
  templateUrl: './library-book-list.html'
})
export class LibraryBookList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly loading = input(false);
  public readonly books = input<FictionBook[] | GameBook[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly delete = output<number>();
  public readonly showBook = output<FictionBook | GameBook>();
  public readonly sort = output<SortingProperty>();
  public readonly pageChange = output<number>();
  public readonly show = output<{ view: string, book: FictionBook | GameBook }>();

  @ViewChild('fictionEditionMenu') fictionEditionMenu!: Menu;
  @ViewChild('gameEditionMenu') gameEditionMenu!: Menu;

  public fictionEditionMenuItems: MenuItem[] = [];
  public gameEditionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onDelete(event: Event, number: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => this.delete.emit(number)
    });
  }

  public openEditionMenu(event: Event, book: FictionBook | GameBook) {
    if (Object.prototype.hasOwnProperty.call(book, 'gameSystem')) {
      this.gameEditionMenuItems = [];
      this.gameEditionMenuItems.push(
        {
          label: 'Datos',
          command: () => this.show.emit({ view: 'details', book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Donantes',
          command: () => this.show.emit({ view: 'donors', book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Autores',
          command: () => this.show.emit({ view: 'authors', book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Editor',
          command: () => this.show.emit({ view: 'publishers', book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Sistema',
          command: () => this.show.emit({ view: 'gameSystem', book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Tipo',
          command: () => this.show.emit({ view: 'bookType', book })
        });
      this.gameEditionMenuItems.push(
        {
          label: 'Préstamos',
          command: () => this.show.emit({ view: 'lendings', book })
        });

      this.gameEditionMenu.toggle(event);
    } else {
      this.fictionEditionMenuItems = [];
      this.fictionEditionMenuItems.push(
        {
          label: 'Datos',
          command: () => this.show.emit({ view: 'details', book })
        });
      this.fictionEditionMenuItems.push(
        {
          label: 'Donantes',
          command: () => this.show.emit({ view: 'donors', book })
        });
      this.fictionEditionMenuItems.push(
        {
          label: 'Autores',
          command: () => this.show.emit({ view: 'authors', book })
        });
      this.fictionEditionMenuItems.push(
        {
          label: 'Editor',
          command: () => this.show.emit({ view: 'publishers', book })
        });
      this.fictionEditionMenuItems.push(
        {
          label: 'Préstamos',
          command: () => this.show.emit({ view: 'lendings', book })
        });

      this.fictionEditionMenu.toggle(event);
    }
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;

    this.sort.emit(new SortingProperty(sorting.field, direction));
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.rows()) + 1;
    this.pageChange.emit(page);
  }

}
