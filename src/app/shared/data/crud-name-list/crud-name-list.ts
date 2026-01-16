import { Component, inject, input, OnInit } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { EMPTY, finalize, Observable, throwError } from 'rxjs';
import { NameForm } from '../name-form/name-form';

@Component({
  selector: 'shared-crud-name-list',
  imports: [TableModule, PanelModule, MenuModule, ButtonModule, DrawerModule, ToastModule, NameForm],
  templateUrl: './crud-name-list.html'
})
export class CrudNameList implements OnInit {

  private readonly auth = inject(AuthService);

  private readonly messageService = inject(MessageService);

  private readonly confirmationService = inject(ConfirmationService);

  public readonly service = input<CrudService<any>>();

  public readonly entityKey = input('');

  public data = new PaginatedResponse<any>();

  public loading = false;

  public showConfirmDelete = false;

  private _shownForm: 'none' | 'creation' | 'edition' = 'none';

  public get view() { return this._shownForm; }

  public set view(form: 'none' | 'creation' | 'edition') {
    this._shownForm = form;
    this.showForm = form !== 'none';
  }

  public showForm = false;

  public selected!: any;

  protected sort = new Sorting();

  public failures = new FailureStore();

  public createable = false;

  public editable = false;

  public deletable = false;

  public get canCreate() {
    return this.createable && !this.loading;
  }

  ngOnInit(): void {
    this.createable = this.auth.hasPermission(this.entityKey(), "create");
    this.editable = this.auth.hasPermission(this.entityKey(), "update");
    this.deletable = this.auth.hasPermission(this.entityKey(), "delete");

    // First page
    this.load(0);
  }

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public onChangeDirection(sorting: { field: string; order: number }) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;

    this.sort.addField(new SortingProperty(sorting.field, direction));
    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.load(page);
  }

  public onStartEditing(item: any): void {
    this.selected = item;
    this.view = 'edition';
  }

  public onStartCreating(): void {
    this.view = 'creation';
  }

  public onCancel(): void {
    this.view = 'none';
  }

  public onCreate(toCreate: any): void {
    const service = this.service();
    if (service) {
      this.call(
        () => service.create(toCreate),
        () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
      );
    }
  }

  public onUpdate(toUpdate: any): void {
    const service = this.service();
    if (service) {
      this.call(
        () => service.update(toUpdate),
        () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
      );
    }
  }

  public onDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Quieres borrar estos datos?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        const service = this.service();
        if (service != undefined) {
          return this.call(
            () => service.delete(id),
            () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
          );
        } else {
          return EMPTY;
        }
      }
    });
  }

  protected load(page: number) {
    const service = this.service();
    if (service) {
      this.loading = true;
      return service.getAll(page, this.sort)
        .pipe(finalize(() => this.loading = false))
        .subscribe(response => this.data = response);
    } else {
      return EMPTY;
    }
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
          this.load(this.data.page);
          onSuccess();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          return throwError(() => error);
        }
      });
  }

}
