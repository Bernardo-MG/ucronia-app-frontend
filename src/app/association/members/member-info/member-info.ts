import { DatePipe } from '@angular/common';
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { Member, PublicMember } from '@ucronia/domain';
import { ButtonModule } from '@openng/optimus-ui/button';
import { MessageModule } from '@openng/optimus-ui/message';
import { MembershipDurationPipe } from '../membership-duration.pipe';

@Component({
  selector: 'assoc-member-info',
  imports: [AuditInfo, DatePipe, DetailField, MembershipDurationPipe, StatusDetail, ButtonModule, MessageModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './member-info.html'
})
export class MemberInfo {

  public readonly data = input<Member | null>(null);
  public readonly error = input(false);
  public readonly loading = input(false);
  public readonly publicData = input<PublicMember | null>(null);
  public readonly showPrivate = input(false);

  public readonly retry = output<void>();

}
