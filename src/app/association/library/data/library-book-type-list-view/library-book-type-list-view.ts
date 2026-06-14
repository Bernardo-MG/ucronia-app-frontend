
import { Component, inject, OnInit } from '@angular/core';
import { NameForm } from '@app/shared/data/name-form/name-form';
import { NameList } from '@app/shared/data/name-list/name-list';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { DetailField } from '@bernardo-mg/ui';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { finalize } from 'rxjs';
import { BookTypeCrudService } from '../book-type-crud-service';

@Component({
  imports: [NameList, DrawerModule, ButtonModule, NameForm, DetailField],
  templateUrl: './library-book-type-list-view.html'
})
export class LibraryBookTypeListView implements OnInit {

  private readonly service = inject(BookTypeCrudService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly permissions: Permissions;

  public data = new Page<any>();
  public loading = false;
  public failures = new FailureStore();
  public view: Drawer = Drawer.NONE;
  public readonly View = Drawer;
  public selected: any;
  protected sort = new Sorting();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission('library_book_type', 'create'),
      edit: authService.hasPermission('library_book_type', 'update'),
      delete: authService.hasPermission('library_book_type', 'delete')
    };
  }

  ngOnInit(): void {
    this.load();
  }

  public onShowCreate(): void {
    this.selected = undefined;
    this.view = Drawer.CREATION;
    this.failures.clear();
  }

  public onShowInfo(item: any): void {
    this.selected = item;
    this.view = Drawer.INFO;
    this.failures.clear();
  }

  public onShowEdit(item: any): void {
    this.selected = item;
    this.view = Drawer.EDITION;
    this.failures.clear();
  }

  public onReject(): void {
    this.view = Drawer.NONE;
    this.failures.clear();
  }

  public onCancelEdit(): void {
    this.view = Drawer.NONE;
    this.failures.clear();
  }

  public confirmDelete(event: Event, id: number): void {
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
      accept: () => this.onDelete(id)
    });
  }

  public onSave(data: any): void {
    if (this.view === Drawer.CREATION) {
      this.onCreate(data);
    } else {
      this.onUpdate(data);
    }
  }

  public onCreate(data: any): void {
    this.loading = true;
    this.service.create(data)
      .pipe(finalize(() => {
        this.loading = false;
        this.view = Drawer.NONE;
      }))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.view = Drawer.NONE;
          this.load(this.data.page);
          this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 });
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
        }
      });
  }

  public onUpdate(data: any): void {
    this.loading = true;
    this.service.update(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.view = Drawer.NONE;
          this.load(this.data.page);
          this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 });
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
        }
      });
  }

  public onDelete(id: number): void {
    this.loading = true;
    this.service.delete(id)
      .pipe(finalize(() => {
        this.loading = false;
        this.view = Drawer.NONE;
      }))
      .subscribe({
        complete: () => {
          this.load(this.data.page);
          this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
        }
      });
  }

  public onSort(sorting: { field: string; order: number }): void {
    const direction = sorting.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));
    this.load(this.data.page);
  }

  // Drawer

  public onDrawerVisibleChange(visible: boolean) {
    if (!visible) {
      this.view = Drawer.NONE;
    }
  }

  public load(page: number | undefined = undefined): void {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

enum Drawer {
  NONE = 'none',
  INFO = 'info',
  CREATION = 'creation',
  EDITION = 'edition'
}