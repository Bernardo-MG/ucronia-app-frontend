
import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { Role, User } from '@bernardo-mg/authentication';
import { ArrayPaginatedResponse } from '@bernardo-mg/request';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'access-user-roles-info',
  imports: [TableModule],
  templateUrl: './user-roles-info.html'
})
export class UserRolesInfo implements OnChanges {

  public readonly user = input(new User());
  public readonly loading = input(false);

  public roles = new ArrayPaginatedResponse<Role>([], 0, 0);

  private pageSize = 10;

  public get first() {
    return (this.roles.page - 1) * this.roles.size;
  }

  public ngOnChanges({ user }: SimpleChanges): void {
    if (user) {
      this.roles = this.buildPage(1);
    }
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.roles.size) + 1;
    this.roles = this.buildPage(page);
  }

  private buildPage(page: number) {
    return new ArrayPaginatedResponse<Role>(this.user().roles, page, this.pageSize);
  }

}
