import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { IconsModule } from '@app/shared/icons/icons.module';
import { WaitingOverlayComponent } from '@app/shared/layout/components/waiting-overlay/waiting-overlay.component';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { LoginRegister } from '../../../models/login-register';
import { AccessAuditLoginService } from '../../../services/access-audit-login.service';
import { AccessAuditLoginListComponent } from '../../list/access-audit-login-list/access-audit-login-list.component';

@Component({
  selector: 'access-audit-login',
  standalone: true,
  imports: [RouterModule, IconsModule, AccessAuditLoginListComponent, PaginationNavigationComponent, WaitingOverlayComponent],
  templateUrl: './access-audit-login.component.html'
})
export class AccessAuditLoginComponent implements OnInit {

  public page = new PaginatedResponse<LoginRegister[]>([]);

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sort([]);

  constructor(
    private service: AccessAuditLoginService
  ) { }

  ngOnInit(): void {
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

}
