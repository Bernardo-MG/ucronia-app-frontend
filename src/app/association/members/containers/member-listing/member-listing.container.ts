import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberService } from '@app/association/members/services/member.service';
import { Member } from '@app/models/members/member';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { MemberListComponent } from '../../components/member-list/member-list.component';

@Component({
  selector: 'assoc-member-listing',
  imports: [RouterModule, CardModule, MemberListComponent, PaginationInfoComponent],
  templateUrl: './member-listing.container.html'
})
export class MemberListingContainer {

  private readonly service = inject(MemberService);

  public data = new PaginatedResponse<Member>();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public reading = false;

  constructor() {
    this.load(0);
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.data.page);
  }

  public load(page: number) {
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

  public routeLinkAdapter(data: Member): string {
    return `${data.number}`;
  }

}
