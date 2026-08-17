
import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Role, User } from '@bernardo-mg/authentication';
import { arrayPage } from '@bernardo-mg/request';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { PublicMember } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'access-user-info',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, CardModule, DetailField, StatusDetail, TableModule],
  templateUrl: './user-info.html'
})
export class UserInfo implements OnChanges {

  public readonly user = input(new User());
  public readonly member = input(new PublicMember());
  public readonly loading = input(false);

  private readonly pageSize = 10;

  public roles = arrayPage<Role>([], 0, 0);

  public get first() {
    return (this.roles.page - 1) * this.roles.size;
  }

  public ngOnChanges({ user }: SimpleChanges): void {
    if (user) {
      this.roles = this.buildPage(1);
    }
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.roles = this.buildPage(page);
  }

  private buildPage(page: number) {
    return arrayPage<Role>(this.user().roles, page, this.pageSize);
  }
}
