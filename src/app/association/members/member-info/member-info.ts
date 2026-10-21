import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { Member, PublicMember } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'assoc-member-info',
  imports: [AuditInfo, DatePipe, DetailField, StatusDetail, ButtonModule, MessageModule],
  templateUrl: './member-info.html'
})
export class MemberInfo {

  public readonly publicData = input<PublicMember | null>(null);
  public readonly data = input<Member | null>(null);
  public readonly showPrivate = input(false);
  public readonly loading = input(false);
  public readonly error = input(false);

  public readonly retry = output<void>();

}
