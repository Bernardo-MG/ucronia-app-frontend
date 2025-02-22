import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberBalanceChartWidgetContainer } from '@app/association/members/balance/containers/member-balance-chart-widget/member-balance-chart-widget.container';
import { MemberListComponent } from '@app/association/members/core/components/member-list/member-list.component';
import { MemberService } from '@app/association/members/core/services/member.service';
import { Member } from '@app/models/members/member';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { ArticleComponent, CardBodyComponent, CardComponent, CardFooterComponent, JustifyCenterDirective } from '@bernardo-mg/layout';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';

@Component({
    selector: 'assoc-member-listing',
    imports: [RouterModule, MemberBalanceChartWidgetContainer, ArticleComponent, MemberListComponent, PaginationInfoComponent, CardComponent, CardBodyComponent, CardFooterComponent, JustifyCenterDirective],
    templateUrl: './member-listing.container.html'
})
export class MemberListingContainer implements OnInit {

  public data = new PaginatedResponse<Member>();

  private sort = new Sorting([]);

  /**
   * Loading flag.
   */
  public reading = false;

  constructor(
    private service: MemberService
  ) { }

  public ngOnInit(): void {
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
