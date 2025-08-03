import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MemberService } from '@app/association/members/services/member.service';
import { Member } from '@app/models/members/member';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-member-list',
  imports: [RouterModule, CardModule, TableModule],
  templateUrl: './member-list.container.html'
})
export class MemberListingContainer {

  private readonly router = inject(Router);

  private readonly service = inject(MemberService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Member>();

  public selectedMember = new Member();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;

  constructor() {
    this.load(0);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    if (sorting.field === 'fullName') {
      let direction;
      if (sorting.order == 1) {
        direction = SortingDirection.Ascending;
      } else {
        direction = SortingDirection.Descending;
      }
      this.sort.addField(new SortingProperty('firstName', direction));
      this.sort.addField(new SortingProperty('lastName', direction));
    }

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onSelectMember() {
    this.router.navigate([`/association/members/${this.selectedMember.number}`]);
  }

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;

        // Reactivate view
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
