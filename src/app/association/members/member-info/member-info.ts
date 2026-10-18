import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { UcroniaClient } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { Member } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { MessageModule } from 'primeng/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'assoc-member-info',
  imports: [AuditInfo, DrawerHeader, DatePipe, DetailField, StatusDetail, ButtonModule, CardModule, DrawerModule, MessageModule],
  templateUrl: './member-info.html'
})
export class MemberInfo implements OnDestroy {
  private readonly client = inject(UcroniaClient);
  public readonly canRead = inject(AuthService).hasPermission(UcroniaPermissions.directory.memberProfile.read);
  public readonly visible = signal(false);
  public readonly loading = signal(false);
  public readonly data = signal<Member | null>(null);
  public readonly error = signal(false);
  private request?: Subscription;
  private number: number | null = null;

  public open(number: number): void {
    if (!this.canRead) return;
    this.request?.unsubscribe();
    this.number = number;
    this.data.set(null);
    this.error.set(false);
    this.loading.set(true);
    this.visible.set(true);
    this.request = this.client.memberProfile.get(number).subscribe({
      next: member => {
        this.data.set(member);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  public retry(): void {
    if (this.number !== null) this.open(this.number);
  }

  public close(): void {
    this.request?.unsubscribe();
    this.number = null;
    this.visible.set(false);
    this.loading.set(false);
    this.data.set(null);
    this.error.set(false);
  }

  public ngOnDestroy(): void { this.request?.unsubscribe(); }
}
