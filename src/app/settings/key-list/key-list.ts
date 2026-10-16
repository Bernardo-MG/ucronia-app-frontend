import { Component, input, output } from '@angular/core';
import { Key } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-key-list',
  imports: [ButtonModule, TableModule, TagModule],
  templateUrl: './key-list.html'
})
export class KeyList {

  public readonly loading = input(false);
  public readonly data = input<Key[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  
  public readonly show = output<Key>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}
