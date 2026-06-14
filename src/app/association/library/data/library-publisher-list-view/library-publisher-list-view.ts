
import { Component, inject, OnInit } from '@angular/core';
import { CrudNameList, CrudFormView } from '@app/shared/data/crud-name-list/crud-name-list';
import { PublisherCrudService } from '../publisher-crud-service';
import { DrawerModule } from 'primeng/drawer';
import { NameForm } from '@app/shared/data/name-form/name-form';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [CrudNameList, DrawerModule, NameForm, ButtonModule],
  templateUrl: './library-publisher-list-view.html'
})
export class LibraryPublisherListView implements OnInit {

  private readonly auth = inject(AuthService);
  protected service = inject(PublisherCrudService);
  private readonly messageService = inject(MessageService);

  public data = new Page<any>();
  public loading = false;
  public failures = new FailureStore();
  public createable = false;
  public editable = false;
  public deletable = false;
  public showForm = false;
  public view: CrudFormView = CrudFormView.NONE;
  public readonly View = CrudFormView;
  public selected: any;
  protected sort = new Sorting();

  ngOnInit(): void {
    this.createable = this.auth.hasPermission('library_publisher', 'create');
    this.editable = this.auth.hasPermission('library_publisher', 'update');
    this.deletable = this.auth.hasPermission('library_publisher', 'delete');
    this.load(1);
  }

  public openCreate(): void {
    this.selected = undefined;
    this.view = CrudFormView.CREATION;
    this.showForm = true;
    this.failures.clear();
  }

  public openView(item: any): void {
    this.selected = item;
    this.view = CrudFormView.VIEW;
    this.showForm = true;
    this.failures.clear();
  }

  public openEdit(item: any): void {
    this.selected = item;
    this.view = CrudFormView.EDITION;
    this.showForm = true;
    this.failures.clear();
  }

  public onReject(): void {
    this.showForm = false;
    this.failures.clear();
  }

  public onSave(data: any): void {
    if (this.view === CrudFormView.CREATION) {
      this.onCreate(data);
    } else {
      this.onUpdate(data);
    }
  }

  public onCreate(data: any): void {
    this.loading = true;
    this.service.create(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.showForm = false;
          this.load(this.data.page || 1);
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
          this.showForm = false;
          this.load(this.data.page || 1);
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
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        complete: () => {
          this.load(this.data.page || 1);
          this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
        }
      });
  }

  public onSort(sorting: { field: string; order: number }): void {
    const direction = sorting.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;
    this.sort = new Sorting();
    this.sort.addField(new SortingProperty(sorting.field, direction));
    this.load(this.data.page || 1);
  }

  public load(page: number): void {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
