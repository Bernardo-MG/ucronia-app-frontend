import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortField } from '@app/core/api/models/sort-field';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { Active } from '../../../models/active';
import { Member } from '../../../models/member';
import { MemberService } from '../../../services/member.service';
import { MemberListComponent } from '../member-list/member-list.component';
import { MemberStatusSelectComponent } from '../../select/member-status-select/member-status-select.component';

@Component({
  selector: 'assoc-member-list-widget',
  standalone: true,
  imports: [RouterModule, IconsModule, MemberListComponent, PaginationNavigationComponent, MemberStatusSelectComponent],
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
  public readingMembers = false;

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

  public onChangeDirection(field: SortField) {
    this.sort.addField(field);

    // We are working with pages using index 0
    // TODO: the pages should come with the correct index
    this.load(this.page.page + 1);
  }

  public load(page: number) {
    this.readingMembers = true;

    this.service.getAll(page, this.sort, this.activeFilter).subscribe({
      next: response => {
        this.page = response;

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