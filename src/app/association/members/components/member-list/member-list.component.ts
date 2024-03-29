import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Sort } from '@app/core/api/models/sort';
import { Active } from '../../models/active';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-list',
  templateUrl: './member-list.component.html'
})
export class MemberListComponent implements OnChanges {

  @Input() public activeFilter = Active.Active;

  public members: Member[] = [];

  /**
   * Loading flag.
   */
  public readingMembers = false;

  public currentPage = 0;

  public totalPages = 0;

  public totalMembers = 0;

  private sort: Sort[] = [];

  constructor(
    private service: MemberService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeFilter']) {
      this.sort = [];
      this.load(undefined);
    }
  }

  public onGoTo(page: number) {
    this.load({ page, sort: this.sort });
  }

  public onChangeDirection(sort: Sort) {
    const index = this.sort.findIndex(s => s.property === sort.property);
    if (index < 0) {
      // New property to sort
      this.sort.push(sort);
    } else {
      // Replace property
      this.sort[index] = sort;
    }
    this.load({ page: this.currentPage, sort: this.sort });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingMembers = true;

    this.service.getAll(pagination, this.activeFilter).subscribe({
      next: response => {
        this.members = response.content;

        this.currentPage = response.page + 1;
        this.totalPages = response.totalPages;
        this.totalMembers = response.totalElements;
        // Reactivate view
        this.readingMembers = false;
      },
      error: error => {
        // Reactivate view
        this.readingMembers = false;
      }
    });
  }

}
