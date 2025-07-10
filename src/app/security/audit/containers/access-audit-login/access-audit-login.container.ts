import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PaginationInfoComponent } from '@app/shared/pagination/components/pagination-info/pagination-info.component';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { ArticleComponent } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { AccessAuditLoginListComponent } from '../../components/access-audit-login-list/access-audit-login-list.component';
import { LoginRegister } from '../../models/login-register';
import { AccessAuditLoginService } from '../../services/access-audit-login.service';

@Component({
  selector: 'access-audit-login',
  imports: [CommonModule, CardModule, AccessAuditLoginListComponent, ArticleComponent, PaginationInfoComponent],
  templateUrl: './access-audit-login.container.html'
})
export class AccessAuditLoginContainer {

  private readonly service = inject(AccessAuditLoginService);

  public data = new PaginatedResponse<LoginRegister>();

  /**
   * Loading flag.
   */
  public reading = false;

  private sort = new Sorting();

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

}
