import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { Member } from "@ucronia/domain";
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-member-list',
  imports: [TableModule, ButtonModule, BadgeModule],
  templateUrl: './member-list.html'
})
export class MemberList {

  public readonly loading = input(false);
  public readonly members = input<Member[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}