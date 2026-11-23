import { Component, input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { Role, User } from '@bernardo-mg/authentication';
import { arrayPage } from '@bernardo-mg/request';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { Profile } from '@ucronia/domain';
import { ButtonModule } from '@openng/optimus-ui/button';
import { CardModule } from '@openng/optimus-ui/card';
import { TableModule, TablePageEvent } from '@openng/optimus-ui/table';

@Component({
  selector: 'access-user-info',
  imports: [AuditInfo, FormsModule, ReactiveFormsModule, ButtonModule, CardModule, DetailField, StatusDetail, TableModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './user-info.html'
})
export class UserInfo implements OnChanges {

  public readonly loading = input(false);
  public readonly member = input(new Profile());
  public readonly user = input(new User());

  public get first() {
    return (this.roles.page - 1) * this.roles.size;
  }
  public roles = arrayPage<Role>([], 0, 0);

  private readonly pageSize = 10;

  // Lifecycle hooks
  public ngOnChanges({ user }: SimpleChanges): void {
    if (user) {
      this.roles = this.buildPage(1);
    }
  }

  // Event handlers
  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.roles = this.buildPage(page);
  }

  // Private methods
  private buildPage(page: number) {
    return arrayPage<Role>(this.user().roles, page, this.pageSize);
  }

}
