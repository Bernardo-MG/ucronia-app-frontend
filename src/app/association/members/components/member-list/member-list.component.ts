import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
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

  public response = new PaginatedResponse<Member[]>([]);

  /**
   * Loading flag.
   */
  public readingMembers = false;

  private sort: Sort[] = [];

  constructor(
    private service: MemberService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeFilter']) {
      this.sort = [];
      this.load(0);
    }
  }

  public onGoTo(page: number) {
    this.load(page);
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

    this.load(this.response.currentPage());
  }

  private load(page: number) {
    this.readingMembers = true;

    this.service.getAll(page, this.sort, this.activeFilter).subscribe({
      next: response => {
        this.response = response;

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
