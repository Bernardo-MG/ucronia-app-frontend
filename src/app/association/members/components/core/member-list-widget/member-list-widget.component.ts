import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { PaginationInfoWrapperComponent } from '@app/shared/layout/components/pagination-info-wrapper/pagination-info-wrapper.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';
import { JustifyEndDirective } from '@app/shared/style/directives/justify-end.directive';
import { Active } from '../../../models/active';
import { Member } from '../../../models/member';
import { MemberService } from '../../../services/member.service';
import { MemberStatusSelectComponent } from '../../shared/member-status-select/member-status-select.component';
import { MemberListComponent } from '../member-list/member-list.component';

@Component({
  selector: 'assoc-member-list-widget',
  standalone: true,
  imports: [RouterModule, MemberListComponent, MemberStatusSelectComponent, PaginationInfoWrapperComponent, JustifyEndDirective, JustifyCenterDirective],
  templateUrl: './member-list-widget.component.html'
})
export class MemberListWidgetComponent implements OnInit {

  public activeFilter = Active.Active;

  public createPermission = false;

  public page = new PaginatedResponse<Member[]>([]);

  private sort = new Sort([]);

  /**
   * Loading flag.
   */
  public reading = false;

  constructor(
    private authContainer: AuthContainer,
    private service: MemberService
  ) { }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("member", "create");

    this.load(0);
  }

  public onChangeActiveFilter(active: Active) {
    this.activeFilter = active;
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

    this.service.getAll(page, this.sort, this.activeFilter).subscribe({
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
    return `/members/${data.number}`;
  }

}
