import { Component, inject, input, output, ViewChild } from '@angular/core';
import { Key } from '@ucronia/domain';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-key-list',
  imports: [MenuModule, ButtonModule, TableModule, TagModule],
  templateUrl: './key-list.html'
})
export class KeyList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly deletable = input(false);
  public readonly data = input<Key[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  
  public readonly show = output<Key>();
  public readonly delete = output<number>();
  public readonly changePage = output<number>();

  @ViewChild('actionsMenu') private actionsMenu!: Menu;
  public actions: MenuItem[] = [];

  public openActionsMenu(event: Event, data: Key): void {
    this.actions = [{
      label: 'Borrar',
      icon: 'pi pi-trash',
      disabled: !this.deletable(),
      command: () => this.confirmDelete(event, data)
    }];
    this.actionsMenu.toggle(event);
  }

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

  public confirmDelete(event: Event, key: Key) {
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
      accept: () => this.delete.emit(key.number)
    });
  }

}
