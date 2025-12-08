
import { Component, inject, OnInit } from '@angular/core';
import { PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TablePageEvent } from 'primeng/table';
import { finalize } from 'rxjs';
import { AccessAuditLoginService } from '../access-audit-login-service';
import { AuditLoginList } from '../audit-login-list/audit-login-list';
import { LoginRegister } from '../models/login-register';

@Component({
  selector: 'audit-view',
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

  public onChangeDirection(sorting: { field: string, order: number }) {
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  private load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}
