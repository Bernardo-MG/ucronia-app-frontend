import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberBalanceChartWidgetComponent } from '@app/association/members/balance/components/member-balance-chart-widget/member-balance-chart-widget.component';
import { MemberListComponent } from '@app/association/members/core/components/member-list/member-list.component';
import { MemberService } from '@app/association/members/core/services/member.service';
import { MemberStatusSelectComponent } from '@app/association/members/shared/components/member-status-select/member-status-select.component';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { Member } from '@app/models/members/member';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PaginationInfoWrapperComponent } from '@app/shared/layout/components/pagination-info-wrapper/pagination-info-wrapper.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { JustifyEndDirective } from '@app/shared/style/directives/justify-end.directive';

@Component({
  selector: 'assoc-member-frontpage',
  standalone: true,
  imports: [RouterModule, CardModule, MemberBalanceChartWidgetComponent, ArticleComponent, MemberListComponent, MemberStatusSelectComponent, PaginationInfoWrapperComponent, JustifyEndDirective, JustifyCenterDirective],
  templateUrl: './member-frontpage.component.html'
})
export class MemberFrontpageComponent implements OnInit {

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

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
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
