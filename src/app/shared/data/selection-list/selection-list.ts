import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { Page } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { EMPTY, Observable } from 'rxjs';
import { NameNumber } from '../model/name-number';

@Component({
  selector: 'shared-selection-list',
  imports: [TableModule, ButtonModule],
  templateUrl: './selection-list.html'
})
export class SelectionList implements OnInit, OnChanges {

  public readonly getSelection = input<(page: number) => Observable<Page<any>>>((page: number) => EMPTY);
  public readonly heading = input('Data');
  public readonly dataKey = input('number');
  public readonly nameRenderer = input((row: any) => row.name);
  public readonly status = input<any>();

  public readonly choose = output<NameNumber>();


  public get first() {
    return (this.selection.page - 1) * this.selection.size;
  }

  public loading = false;

  public selectedData: NameNumber | undefined;

  public selection = new Page<NameNumber>();

  public ngOnInit(): void {
    this.getSelection()(0)
      .subscribe(response => this.selection = response);
  }

  public ngOnChanges({ status }: SimpleChanges): void {
    if (status) {
      this.getSelection()(0)
        .subscribe(response => this.selection = response);
    }
  }

  public onGoToSelectionPage(event: TablePageEvent) {
    const page = (event.first / this.selection.size) + 1;
    this.getSelection()(page)
      .subscribe(response => this.selection = response);
  }

}
