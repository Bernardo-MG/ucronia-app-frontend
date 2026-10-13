import { Component, inject, input, output, ViewChild } from '@angular/core';
import { GameTable } from '@ucronia/domain';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-game-table-list', imports: [MenuModule, ButtonModule, TableModule],
  templateUrl: './game-table-list.html'
})
export class GameTableList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly deletable = input(false);
  public readonly data = input<GameTable[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<GameTable>();
  public readonly delete = output<number>();
  public readonly changePage = output<number>();

  @ViewChild('actionsMenu') private actionsMenu!: Menu;
  public actions: MenuItem[] = [];

  public openActionsMenu(event: Event, data: GameTable): void {
    this.actions = [{
      label: 'Borrar',
      icon: 'pi pi-trash',
      disabled: !this.deletable(),
      command: () => this.confirmDelete(event, data)
    }];
    this.actionsMenu.toggle(event);
  }

  public get first(): number { return (this.page() - 1) * this.rows(); }

  public onPageChange(event: TablePageEvent): void {
    this.changePage.emit((event.first / event.rows) + 1);
  }

  public confirmDelete(event: Event, table: GameTable): void {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es reversible', icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => this.delete.emit(table.number)
    });
  }
}
