import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaginationRequest } from '@app/core/api/models/pagination-request';
import { Active } from '../../models/active';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'assoc-member-selection-list',
  templateUrl: './member-selection-list.component.html'
})
export class MemberSelectionListComponent implements OnChanges {

  @Input() public activeFilter = Active.Active;

  public members: Member[] = [];

  /**
   * Loading flag.
   */
  public readingMembers = false;

  public currentPage = 0;

  public totalPages = 0;

  public totalMembers = 0;

  constructor(
    private service: MemberService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeFilter']) {
      this.load(undefined);
    }
  }

  public onGoTo(page: number) {
    this.load({ page });
  }

  private load(pagination: PaginationRequest | undefined) {
    this.readingMembers = true;

    this.service.getAll(pagination, this.activeFilter).subscribe({
      next: page => {
        this.members = page.content;

        this.currentPage = page.page + 1;
        this.totalPages = page.totalPages;
        this.totalMembers = page.totalElements;
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
