import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberBalanceChartWidgetContainer } from '@app/association/members/balance/containers/member-balance-chart-widget/member-balance-chart-widget.container';
import { MemberListComponent } from '@app/association/members/core/components/member-list/member-list.component';
import { MemberService } from '@app/association/members/core/services/member.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Member } from '@app/models/members/member';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardFooterComponent } from '@app/shared/card/components/card-footer/card-footer.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { ArticleComponent, JustifyCenterDirective } from '@bernardo-mg/layout';

@Component({
    selector: 'assoc-member-listing',
    imports: [RouterModule, MemberBalanceChartWidgetContainer, ArticleComponent, MemberListComponent, PaginationInfoComponent, CardComponent, CardBodyComponent, CardFooterComponent, JustifyCenterDirective],
    templateUrl: './member-listing.container.html'
})
export class MemberListingContainer implements OnInit {

  public data = new PaginatedResponse<Member[]>([]);

  private sort = new Sort([]);

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

  public onChangeDirection(field: SortProperty) {
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
