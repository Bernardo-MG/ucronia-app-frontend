import { Component, input, output } from '@angular/core';
import { Page } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';

export enum CrudFormView {
  NONE = 'none',
  INFO = 'info',
  CREATION = 'creation',
  EDITION = 'edition'
}

@Component({
  selector: 'shared-name-list',
  imports: [TableModule, PanelModule, MenuModule, ButtonModule],
  templateUrl: './name-list.html'
})
export class NameList {

  public readonly data = input<Page<any>>(new Page<any>());
  public readonly loading = input<boolean>(false);

  public readonly show = output<any>();
  public readonly sortChange = output<{ field: string; order: number }>();
  public readonly pageChange = output<number>();

  public get first() {
    const page = this.data().page || 1;
    return (page - 1) * this.data().size;
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

}
