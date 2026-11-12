import { DatePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
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

  public readonly data = input<Member | null>(null);
  public readonly error = input(false);
  public readonly loading = input(false);
  public readonly publicData = input<PublicMember | null>(null);
  public readonly showPrivate = input(false);

  public readonly retry = output<void>();

  public readonly membershipDuration = computed(() => {
    const totalMonths = this.publicData()?.totalMonths;
    if (totalMonths === undefined) {
      return '—';
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts: string[] = [];

    if (years > 0) {
      parts.push(new Intl.NumberFormat('es', { style: 'unit', unit: 'year', unitDisplay: 'long' }).format(years));
    }
    if (months > 0 || years === 0) {
      parts.push(new Intl.NumberFormat('es', { style: 'unit', unit: 'month', unitDisplay: 'long' }).format(months));
    }

    return new Intl.ListFormat('es', { type: 'conjunction' }).format(parts);
  });

}
