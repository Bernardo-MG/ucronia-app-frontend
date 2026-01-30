import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { TableModule, TablePageEvent } from 'primeng/table';
import { LoginRegister } from '@bernardo-mg/security';

@Component({
  selector: 'access-audit-login-list',
  imports: [TableModule, DatePipe],
  templateUrl: './audit-login-list.html'
})
export class AuditLoginList {

  public readonly loading = input(false);
  public readonly logins = input<LoginRegister[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

}
