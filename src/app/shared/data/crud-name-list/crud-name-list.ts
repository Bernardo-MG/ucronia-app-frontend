import { Component, inject, input, OnInit } from '@angular/core';
import { CrudService } from '@app/shared/data/services/crud-service';
import { AuthContainer } from '@bernardo-mg/authentication';
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

  private readonly auth = inject(AuthContainer);

  private readonly messageService = inject(MessageService);

  private readonly confirmationService = inject(ConfirmationService);

  public readonly service = input<CrudService<any>>();

  public readonly entityKey = input('');

  public data = new PaginatedResponse<any>();

  public loading = false;

  public showConfirmDelete = false;

  private _shownForm: 'none' | 'creation' | 'edition' = 'none';

  public get shownForm() { return this._shownForm; }

  public set shownForm(form: 'none' | 'creation' | 'edition') {
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
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onStartEditing(item: any): void {
    this.selected = item;
    this.shownForm = 'edition';
  }

  public onStartCreating(): void {
    this.shownForm = 'creation';
  }

  public onCancel(): void {
    this.shownForm = 'none';
  }

  public onCreate(toCreate: any): void {
    this.mutate(() => {
      const service = this.service();
      if (service) {
        return service.create(toCreate);
      } else {
        return EMPTY;
      }
    });
  }

  public onUpdate(toUpdate: any): void {
    this.mutate(() => {
      const service = this.service();
      if (service) {
        return service.update(toUpdate);
      } else {
        return EMPTY;
      }
    });
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
          this.mutate(() => service.delete(id));
          return this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
        } else {
          return EMPTY;
        }
      }
    });
  }

  protected load(page: number) {
    this.loading = true;
    const service = this.service();
    if (service) {
      return service.getAll(page, this.sort)
        .pipe(finalize(() => this.loading = false))
        .subscribe(response => this.data = response);
    } else {
      this.loading = false;
      return EMPTY;
    }
  }

  private mutate(action: () => Observable<any>) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.shownForm = 'none';
          this.load(this.data.page);
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
