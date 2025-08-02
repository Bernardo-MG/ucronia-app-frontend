import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MemberService } from '@app/association/members/services/member.service';
import { Member } from '@app/models/members/member';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-member-listing',
  imports: [RouterModule, CardModule, TableModule],
  templateUrl: './member-listing.container.html'
})
export class MemberListingContainer {

  private readonly router = inject(Router);

  private readonly service = inject(MemberService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Member>();

  public selectedMember: Member = new Member();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public reading = false;

  constructor() {
    this.load(0);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
    if (sorting.field === 'fullName') {
      if (sorting.order == 1) {
        this.sort.addField(new SortingProperty('firstName', SortingDirection.Ascending));
        this.sort.addField(new SortingProperty('lastName', SortingDirection.Ascending));
      } else {
        this.sort.addField(new SortingProperty('firstName', SortingDirection.Descending));
        this.sort.addField(new SortingProperty('lastName', SortingDirection.Descending));
      }
    }

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1
    this.load(page);
  }

  public onSelectMember() {
    this.router.navigate([`/association/members/${this.selectedMember.number}`]);
  }

  private load(page: number) {
    this.reading = true;

    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;

        // Reactivate view
        this.reading = false;
      },
      error: error => {
        // Reactivate view
        this.reading = false;
      }
    });
  }

}
