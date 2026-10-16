import { Component, input, output } from '@angular/core';
import { GameTable } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-game-table-list', imports: [ButtonModule, TableModule],
  templateUrl: './game-table-list.html'
})
export class GameTableList {

  public readonly loading = input(false);
  public readonly data = input<GameTable[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<GameTable>();
  public readonly changePage = output<number>();

  public get first(): number { return (this.page() - 1) * this.rows(); }

  public onPageChange(event: TablePageEvent): void {
    this.changePage.emit((event.first / event.rows) + 1);
  }

}
