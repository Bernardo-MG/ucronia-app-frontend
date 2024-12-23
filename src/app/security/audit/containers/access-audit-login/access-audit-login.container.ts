import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { Sort } from '@app/core/api/models/sort';
import { SortProperty } from '@app/core/api/models/sort-field';
import { CardModule } from '@app/shared/card/card.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { PaginationInfoComponent } from '@app/shared/layout/components/pagination-info/pagination-info.component';
import { AccessAuditLoginListComponent } from '../../components/access-audit-login-list/access-audit-login-list.component';
import { LoginRegister } from '../../models/login-register';
import { AccessAuditLoginService } from '../../services/access-audit-login.service';

@Component({
  selector: 'access-audit-login',
  standalone: true,
  imports: [CardModule, AccessAuditLoginListComponent, ArticleComponent, PaginationInfoComponent],
  templateUrl: './access-audit-login.container.html'
})
export class AccessAuditLoginContainer implements OnInit {

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
