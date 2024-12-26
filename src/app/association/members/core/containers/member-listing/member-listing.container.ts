import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberBalanceChartWidgetContainer } from '@app/association/members/balance/containers/member-balance-chart-widget/member-balance-chart-widget.container';
import { MemberListComponent } from '@app/association/members/core/components/member-list/member-list.component';
import { MemberService } from '@app/association/members/core/services/member.service';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Member } from '@app/models/members/member';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PaginationInfoComponent } from '@app/shared/layout/components/pagination-info/pagination-info.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
  selector: 'assoc-member-listing',
  standalone: true,
  imports: [RouterModule, CardModule, MemberBalanceChartWidgetContainer, ArticleComponent, MemberListComponent, PaginationInfoComponent, JustifyCenterDirective],
  templateUrl: './member-listing.container.html'
})
export class MemberListingContainer implements OnInit {

  public page = new PaginatedResponse<Member[]>([]);

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

    this.load(this.page.page);
  }

  public load(page: number) {
    this.reading = true;

    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.page = response;

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
