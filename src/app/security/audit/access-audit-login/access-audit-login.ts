
import { Component, inject } from '@angular/core';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';
import { LoginRegister } from '../models/login-register';
import { AccessAuditLoginService } from '../access-audit-login-service';

@Component({
  selector: 'access-audit-login',
  imports: [CardModule, TableModule],
  templateUrl: './access-audit-login.html'
})
export class AccessAuditLogin {

  private readonly service = inject(AccessAuditLoginService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<LoginRegister>();

  /**
   * Loading flag.
   */
  public loading = false;

  private sort = new Sorting();

  constructor() {
    this.load(0);
  }

  public onChangeDirection(field: SortingProperty) {
    this.sort.addField(field);

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  private load(page: number) {
    this.loading = true;
    this.service.getAll(page, this.sort).subscribe({
      next: response => {
        this.data = response;

        // Reactivate view
        this.loading = false;
      },
      error: error => {
        // Reactivate view
        this.loading = false;
      }
    });
  }

}
