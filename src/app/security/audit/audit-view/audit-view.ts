
import { Component, inject, OnInit } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { LoginRegister } from '@bernardo-mg/security';
import { CardModule } from 'primeng/card';
import { finalize } from 'rxjs';
import { AccessAuditLoginService } from '../access-audit-login-service';
import { AuditLoginList } from '../audit-login-list/audit-login-list';

@Component({
  selector: 'access-audit-view',
  imports: [CardModule, AuditLoginList],
  templateUrl: './audit-view.html'
})
export class AccessAuditLogin implements OnInit {

  private readonly service = inject(AccessAuditLoginService);

  public data = new PaginatedResponse<LoginRegister>();

  /**
   * Loading flag.
   */
  public loading = false;

  private sort = new Sorting();

  public ngOnInit(): void {
    this.load(0);
  }

  public onChangeDirection(sorting: SortingEvent) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
