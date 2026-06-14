import { Component, inject, input, output } from '@angular/core';
import { Page } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

export enum CrudFormView {
  NONE = 'none',
  VIEW = 'view',
  CREATION = 'creation',
  EDITION = 'edition'
}

@Component({
  selector: 'shared-crud-name-list',
  imports: [TableModule, PanelModule, MenuModule, ButtonModule],
  templateUrl: './crud-name-list.html'
})
export class CrudNameList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly data = input<Page<any>>(new Page<any>());
  public readonly loading = input<boolean>(false);
  public readonly createable = input<boolean>(false);
  public readonly editable = input<boolean>(false);
  public readonly deletable = input<boolean>(false);

  public readonly startCreating = output<void>();
  public readonly show = output<any>();
  public readonly startEditing = output<any>();
  public readonly deleted = output<number>();
  public readonly sortChange = output<{ field: string; order: number }>();
  public readonly pageChange = output<number>();

  public get first() {
    const page = this.data().page || 1;
    return (page - 1) * this.data().size;
  }

  public get canCreate() {
    return this.createable() && !this.loading();
  }

  public onChangeDirection(sorting: { field: string; order: number }) {
    this.sortChange.emit(sorting);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.pageChange.emit(page);
  }

  public onShow(item: any): void {
    this.show.emit(item);
  }

  public onStartCreating(): void {
    this.startCreating.emit();
  }

  public onStartEditing(item: any): void {
    this.startEditing.emit(item);
  }

  public onDelete(event: Event, id: number): void {
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
      accept: () => this.deleted.emit(id)
    });
  }

}
