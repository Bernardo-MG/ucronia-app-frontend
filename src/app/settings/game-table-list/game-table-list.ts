import { Component, inject, input, output } from '@angular/core';
import { GameTable } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-game-table-list', imports: [ButtonModule, TableModule],
  templateUrl: './game-table-list.html'
})
export class GameTableList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly data = input<GameTable[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly edit = output<GameTable>();
  public readonly delete = output<number>();
  public readonly changePage = output<number>();

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
