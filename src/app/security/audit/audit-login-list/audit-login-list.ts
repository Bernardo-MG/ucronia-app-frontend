import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { LoginRegister } from '../models/login-register';

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

  public readonly changeDirection = output<{ field: string, order: number }>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

}
