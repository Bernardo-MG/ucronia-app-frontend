
import { Component, OnChanges, SimpleChanges, input, output } from '@angular/core';
import { Role } from '@bernardo-mg/authentication';
import { ArrayPaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'access-user-roles',
  imports: [ButtonModule, TableModule],
  templateUrl: './access-user-roles.html'
})
export class AccessUserRoles implements OnChanges {

  public readonly roles = input<Role[]>([]);
  public readonly loading = input(false);

  public readonly remove = output<Role>();

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new ArrayPaginatedResponse<Role>([], 0, 0);

  private pageSize = 10;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['roles']) {
      this.data = this.buildPage(1);
    }
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.data = this.buildPage(page);
  }

  public onRemove(role: Role): void {
    this.remove.emit(role);
  }

  private buildPage(page: number) {
    return new ArrayPaginatedResponse<Role>(this.roles(), page, this.pageSize);
  }

}
