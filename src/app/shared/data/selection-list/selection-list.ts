import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@bernardo-mg/request';
import { TableModule, TablePageEvent } from 'primeng/table';
import { EMPTY, Observable } from 'rxjs';
import { NameNumber } from '../model/name-number';

@Component({
  selector: 'shared-selection-list',
  imports: [TableModule],
  templateUrl: './selection-list.html'
})
export class SelectionList implements OnChanges {

  public readonly getSelection = input<(page: number) => Observable<PaginatedResponse<any>>>((page: number) => EMPTY);

  public readonly heading = input('Data');

  public readonly dataKey = input('number');

  public readonly nameRenderer = input((row: any) => row.name);

  public readonly choose = output<NameNumber>();

  public get first() {
    return (this.selection.page - 1) * this.selection.size;
  }

  public loading = false;

  public selectedData: NameNumber | undefined;

  public selection = new PaginatedResponse<NameNumber>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['getSelection'] && this.getSelection) {
      this.getSelection()(0).subscribe(response => this.selection = response);
    }
  }

  public onGoToSelectionPage(event: TablePageEvent) {
    const page = (event.first / this.selection.size) + 1;
    this.getSelection()(page).subscribe(response => this.selection = response);
  }

  public onSelectRow() {
    if (this.selectedData) {
      this.choose.emit(this.selectedData);
    }
  }

}
