import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { AuditDetails, AuditUser } from '@ucronia/domain';

@Component({
  selector: 'assoc-audit-info',
  imports: [DatePipe],
  templateUrl: './audit-info.html'
})
export class AuditInfo {
  public readonly audit = input<AuditDetails | null | undefined>();
  public readonly loading = input(false);

  public userLabel(user: AuditUser | null | undefined): string {
    return user?.name?.trim() || user?.username?.trim() || user?.email?.trim() || '';
  }
}
