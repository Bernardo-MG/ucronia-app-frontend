import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, output, signal, viewChild } from '@angular/core';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { KeyService } from '@app/settings/key-service';
import { AuditInfo } from '@app/shared/audit/audit-info/audit-info';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore } from '@bernardo-mg/request';
import { DetailField, StatusDetail } from '@bernardo-mg/ui';
import { MemberUpdate, UcroniaClient } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { ContactMethod, FeeType, Key, Member, PublicMember } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { MessageModule } from 'primeng/message';
import { forkJoin, Subscription } from 'rxjs';
import { MemberEditionForm } from '../member-edition-form/member-edition-form';

@Component({
  selector: 'assoc-member-info',
  imports: [MemberEditionForm, DrawerActions, DrawerFormActions, AuditInfo, DrawerHeader, DatePipe, DetailField, StatusDetail, ButtonModule, DrawerModule, MessageModule],
  templateUrl: './member-info.html'
})
export class MemberInfo implements OnDestroy {
  private readonly drawer = viewChild(Drawer);
  private readonly feeTypeService = inject(FeeTypeService);
  private readonly contactMethodService = inject(ContactMethodService);
  private readonly keyService = inject(KeyService);
  private readonly messages = inject(MessageService);
  public readonly updated = output<Member>();
  public readonly editing = signal(false);
  public readonly saving = signal(false);
  public readonly loadingOptions = signal(false);
  public readonly optionsReady = signal(false);
  public readonly editError = signal('');
  public failures = new FailureStore();
  public feeTypes: FeeType[] = [];
  public contactMethods: ContactMethod[] = [];
  public keys: Key[] = [];
  private optionsRequest?: Subscription;
  private saveRequest?: Subscription;
  private readonly client = inject(UcroniaClient);
  private readonly auth = inject(AuthService);
  public readonly canRead = this.auth.hasPermission(UcroniaPermissions.directory.member.read);
  public readonly canReadPrivate = this.auth.hasPermission(UcroniaPermissions.directory.memberProfile.read);
  public readonly canUpdate = this.auth.hasPermission(UcroniaPermissions.directory.memberProfile.update);
  public readonly publicData = signal<PublicMember | null>(null);
  public readonly visible = signal(false);
  public readonly loading = signal(false);
  public readonly data = signal<Member | null>(null);
  public readonly error = signal(false);
  private request?: Subscription;

  public open(member: PublicMember): void {
    if (!this.canRead || this.saving()) return;
    this.cancelEdit();
    this.request?.unsubscribe();
    this.publicData.set(member);
    this.data.set(null);
    this.error.set(false);
    this.loading.set(false);
    this.visible.set(true);
    if (this.canReadPrivate) this.loadPrivate(member.number);
  }

  private loadPrivate(number: number): void {
    this.request?.unsubscribe();
    this.error.set(false);
    this.loading.set(true);
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
    const member = this.publicData();
    if (this.canRead && this.canReadPrivate && this.visible() && member) this.loadPrivate(member.number);
  }

  public startEdit(): void {
    if (!this.canUpdate || !this.canReadPrivate || !this.data() || this.loading() || this.saving()) return;
    this.failures.clear();
    this.editError.set('');
    this.editing.set(true);
    this.optionsReady.set(false);
    this.loadingOptions.set(true);
    this.optionsRequest?.unsubscribe();
    this.optionsRequest = forkJoin({
      feeTypes: this.feeTypeService.getAllAvailable(),
      contactMethods: this.contactMethodService.getAllAvailable(),
      keys: this.keyService.getAllAvailable()
    }).subscribe({
      next: options => {
        this.feeTypes = options.feeTypes;
        this.contactMethods = options.contactMethods;
        this.keys = options.keys;
        // Retain assigned lookups even when unavailable for new assignments.
        const member = this.data()!;
        if (!this.feeTypes.some(fee => fee.number === member.feeType.number)) this.feeTypes = [...this.feeTypes, member.feeType];
        for (const channel of member.contactChannels ?? []) {
          if (!this.contactMethods.some(method => method.number === channel.method.number)) this.contactMethods = [...this.contactMethods, channel.method];
        }
        if (member.key != null && !this.keys.some(key => key.number === member.key)) {
          this.keys = [...this.keys, Object.assign(new Key(), { number: member.key })];
        }
        this.optionsReady.set(true);
        this.loadingOptions.set(false);
        this.drawer()?.cd.markForCheck();
      },
      error: () => {
        this.loadingOptions.set(false);
        this.editError.set('No se pudieron cargar las opciones. Cancela y vuelve a intentarlo.');
        this.drawer()?.cd.markForCheck();
      }
    });
    this.drawer()?.cd.markForCheck();
  }

  public cancelEdit(): void {
    if (this.saving()) return;
    this.optionsRequest?.unsubscribe();
    this.editing.set(false);
    this.loadingOptions.set(false);
    this.optionsReady.set(false);
    this.failures.clear();
    this.editError.set('');
    this.drawer()?.cd.markForCheck();
  }

  public onUpdate(change: MemberUpdate): void {
    const member = this.data();
    if (!this.canUpdate || !this.canReadPrivate || !this.editing() || !this.optionsReady() || !member || this.saving()) return;
    this.saving.set(true);
    this.editError.set('');
    this.saveRequest = this.client.memberProfile.update(member.number, change).subscribe({
      next: updated => {
        this.saving.set(false);
        this.data.set(updated);
        this.publicData.set({ number: updated.number, memberNumber: updated.memberNumber, name: updated.name, key: updated.key, renew: updated.renew });
        this.cancelEdit();
        this.messages.add({ severity: 'info', summary: 'Actualizado', detail: 'Socio actualizado', life: 3000 });
        this.updated.emit(updated);
      },
      error: error => {
        this.saving.set(false);
        if (error instanceof FailureResponse) this.failures = error.failures;
        else this.failures.clear();
        this.editError.set('No se pudo actualizar el socio. Revisa los datos e inténtalo de nuevo.');
        this.drawer()?.cd.markForCheck();
      }
    });
  }

  public close(): void {
    if (this.saving()) return;
    this.cancelEdit();
    this.request?.unsubscribe();
    this.publicData.set(null);
    this.visible.set(false);
    this.loading.set(false);
    this.data.set(null);
    this.error.set(false);
  }

  public ngOnDestroy(): void {
    this.request?.unsubscribe();
    this.optionsRequest?.unsubscribe();
    this.saveRequest?.unsubscribe();
  }
}
