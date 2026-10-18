import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { PublicMember } from '@ucronia/domain';
import { TableModule, TablePageEvent } from 'primeng/table';
import { PublicMemberRenewTag } from '../public-member-renew-tag/public-member-renew-tag';

@Component({
  selector: 'assoc-public-member-list',
  imports: [TableModule, PublicMemberRenewTag],
  templateUrl: './public-member-list.html'
})
export class PublicMemberList {

  public readonly loading = input(false);
  public readonly members = input<PublicMember[]>([]);
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
