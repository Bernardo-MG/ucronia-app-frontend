import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { DrawerActions } from '@app/shared/ui/drawer-actions/drawer-actions';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MemberCount, MemberCreation, MemberUpdate, UcroniaClient } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { ContactMethod, FeeType, Key, KeyAssignment, Member, PublicMember } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TabsModule } from 'primeng/tabs';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  forkJoin,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap
} from 'rxjs';
import { MemberCreationForm } from '../../members/member-creation-form/member-creation-form';
import { Dialog } from '../members-dialog';
import { MemberInfo } from '../member-info/member-info';
import { MemberEditionForm } from '../member-edition-form/member-edition-form';
import { MemberKeyInfo } from '../member-key-info/member-key-info';
import { MemberKeyForm } from '../member-key-form/member-key-form';
import { MemberKeyList } from '../member-key-list/member-key-list';
import { MemberKeyService } from '../member-key-service';
import { PublicMemberList } from '../public-member-list/public-member-list';
import { PublicMemberService } from '../public-member-service';

@Component({
  selector: 'assoc-public-member-view',
  imports: [
    MemberInfo,
    MemberEditionForm,
    MemberKeyInfo,
    DrawerActions,
    MemberKeyForm,
    TabsModule,
    MemberKeyList,
    DrawerHeader,
    DrawerFormActions,
    DrawerModule,
    ButtonModule,
    MessageModule,
    MemberCreationForm,
    FormsModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PublicMemberList
  ],
  templateUrl: './public-member-view.html'
})
export class PublicMemberView implements OnInit, OnDestroy {

  private readonly service = inject(PublicMemberService);

  private readonly client = inject(UcroniaClient);

  private readonly feeTypeService = inject(FeeTypeService);

  private readonly contactMethodService = inject(ContactMethodService);

  private readonly keyService = inject(MemberKeyService);

  private readonly messages = inject(MessageService);

  private readonly confirmationService = inject(ConfirmationService);

  private readonly destroyRef = inject(DestroyRef);

  private keysReloadRequested = false;
  private memberRequest?: Subscription;
  private memberOptionsRequest?: Subscription;

  public readonly permissions = {
    read: inject(AuthService).hasPermission(UcroniaPermissions.directory.member.read),
    readPrivate: inject(AuthService).hasPermission(UcroniaPermissions.directory.memberProfile.read),
    edit: inject(AuthService).hasPermission(UcroniaPermissions.directory.memberProfile.update),
    keysEdit: inject(AuthService).hasPermission(UcroniaPermissions.key.update),
    keysDelete: inject(AuthService).hasPermission(UcroniaPermissions.key.delete),
    keysCreate: inject(AuthService).hasPermission(UcroniaPermissions.key.create),
    keysRead: inject(AuthService).hasPermission(UcroniaPermissions.key.read),
    create: inject(AuthService).hasPermission(UcroniaPermissions.directory.memberProfile.create)
  };
  public selectedTab = 'members';
  public dialog = Dialog.NONE;
  public readonly Dialog = Dialog;
  public selectedKey: KeyAssignment | undefined;
  public keyAssignments: KeyAssignment[] = [];
  public loadingKeys = false;
  public keysError = false;
  public privateMember: Member | null = null;
  public loadingMember = false;
  public memberPrivateError = false;
  public memberSaving = false;
  public memberEditError = '';
  public savingKey = false;
  public keyCreationError = '';
  public keyFailures = new FailureStore();
  public saving = false;
  public loadingOptions = false;
  public optionsReady = false;
  public creationError = '';
  public feeTypes: FeeType[] = [];
  public contactMethods: ContactMethod[] = [];
  public keys: Key[] = [];
  public data = new Page<PublicMember>();
  public selectedData = new PublicMember();
  private memberCount = new MemberCount();

  public get active() {
    return this.memberCount.active;
  }

  public get notRenewing() {
    return this.memberCount.active - this.memberCount.renew;
  }

  private sort = new Sorting();
  public readonly status: Status = {
    loading: false,
    loadingSummary: false
  };
  public failures = new FailureStore();
  private nameFilter = '';
  public filterValue = '';
  private readonly filterSubject = new Subject<string>();

  constructor() {
    const destroyRef = inject(DestroyRef);
    this.filterSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(destroyRef))
      .subscribe(filter => this.onFilter(filter));
  }

  public ngOnInit(): void {
    this.refresh();
  }

  public ngOnDestroy(): void {
    this.memberRequest?.unsubscribe();
    this.memberOptionsRequest?.unsubscribe();
  }

  public onTabChange(value: string | number | undefined): void {
    if (value === 'keys' && !this.permissions.keysRead) {
      return;
    }
    this.selectedTab = value === 'keys' ? 'keys' : 'members';
    if (this.selectedTab === 'keys') {
      this.loadKeys();
    }
  }

  public onCreateKeyOpen(): void {
    if (
      !this.permissions.keysRead ||
      !this.permissions.keysCreate ||
      this.selectedTab !== 'keys' ||
      this.dialog !== Dialog.NONE
    ) {
      return;
    }
    this.keyFailures.clear();
    this.keyCreationError = '';
    this.dialog = Dialog.KEY_CREATE;
  }

  public onCreateKey(data: Key): void {
    if (
      !this.permissions.keysRead ||
      !this.permissions.keysCreate ||
      this.dialog !== Dialog.KEY_CREATE ||
      this.savingKey
    ) {
      return;
    }
    this.savingKey = true;
    this.keyCreationError = '';
    this.keyService
      .create(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.savingKey = false))
      )
      .subscribe({
        next: () => {
          this.keyFailures.clear();
          this.dialog = Dialog.NONE;
          this.loadKeys();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.keyFailures = error.failures;
          } else {
            this.keyFailures.clear();
          }
          this.keyCreationError = 'No se pudo crear la llave. Revisa los datos e inténtalo de nuevo.';
        }
      });
  }

  public loadKeys(): void {
    if (!this.permissions.keysRead) {
      return;
    }
    if (this.loadingKeys) {
      this.keysReloadRequested = true;
      return;
    }
    this.loadingKeys = true;
    this.keysError = false;
    this.keyService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loadingKeys = false;
          if (this.keysReloadRequested && !this.destroyRef.destroyed) {
            this.keysReloadRequested = false;
            this.loadKeys();
          }
        })
      )
      .subscribe({
        next: data => {
          this.keyAssignments = data;
        },
        error: () => {
          this.keysError = true;
          this.keyAssignments = [];
        }
      });
  }

  public onShowKey(data: KeyAssignment): void {
    if (!this.permissions.keysRead || this.savingDialog) {
      return;
    }
    this.selectedKey = data;
    this.keyFailures.clear();
    this.keyCreationError = '';
    this.dialog = Dialog.KEY_INFO;
  }

  public onShowKeyEdit(): void {
    if (!this.permissions.keysRead || !this.permissions.keysEdit || !this.selectedKey || this.savingKey) {
      return;
    }
    this.keyFailures.clear();
    this.keyCreationError = '';
    this.dialog = Dialog.KEY_EDIT;
  }

  public onCancelKeyEdit(): void {
    if (!this.savingKey) {
      this.keyFailures.clear();
      this.keyCreationError = '';
      this.dialog = Dialog.KEY_INFO;
    }
  }

  public onUpdateKey(data: Key): void {
    if (
      !this.permissions.keysRead ||
      !this.permissions.keysEdit ||
      !this.selectedKey ||
      this.dialog !== Dialog.KEY_EDIT ||
      this.savingKey
    ) {
      return;
    }
    const number = this.selectedKey.number;
    this.callKey(() => this.keyService.update({ ...data, number }), 'No se pudo actualizar la llave.');
  }

  public onDeleteKey(event: Event): void {
    if (
      !this.permissions.keysRead ||
      !this.permissions.keysDelete ||
      !this.selectedKey ||
      this.dialog !== Dialog.KEY_INFO ||
      this.savingKey
    ) {
      return;
    }
    const number = this.selectedKey.number;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es reversible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => {
        if (
          !this.destroyRef.destroyed &&
          !this.savingKey &&
          this.dialog === Dialog.KEY_INFO &&
          this.selectedKey?.number === number
        ) {
          this.callKey(() => this.keyService.delete(number), 'No se pudo borrar la llave.');
        }
      }
    });
  }

  private callKey(action: () => Observable<Key>, message: string): void {
    this.savingKey = true;
    this.keyCreationError = '';
    action()
      .pipe(
        finalize(() => (this.savingKey = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.dialog = Dialog.NONE;
          this.keyFailures.clear();
          this.loadKeys();
          this.refresh();
        },
        error: error => {
          this.keyFailures = error instanceof FailureResponse ? error.failures : new FailureStore();
          this.keyCreationError = message;
        }
      });
  }

  public onShowMember(member: PublicMember): void {
    if (!this.permissions.read || this.savingDialog) {
      return;
    }
    this.memberOptionsRequest?.unsubscribe();
    this.memberRequest?.unsubscribe();
    this.selectedData = member;
    this.privateMember = null;
    this.memberPrivateError = false;
    this.dialog = Dialog.INFO;
    this.loadingMember = false;
    this.memberEditError = '';
    if (this.permissions.readPrivate) {
      this.loadPrivateMember();
    }
  }

  public loadPrivateMember(): void {
    if (!this.permissions.read || !this.permissions.readPrivate || (this.dialog !== Dialog.INFO && this.dialog !== Dialog.EDIT)) {
      return;
    }
    this.memberRequest?.unsubscribe();
    this.loadingMember = true;
    this.memberPrivateError = false;
    this.memberRequest = this.client.memberProfile
      .get(this.selectedData.number)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loadingMember = false))
      )
      .subscribe({
        next: member => (this.privateMember = member),
        error: () => (this.memberPrivateError = true)
      });
  }

  public onShowMemberEdit(): void {
    if (
      !this.permissions.read ||
      !this.permissions.edit ||
      !this.permissions.readPrivate ||
      this.dialog !== Dialog.INFO ||
      !this.privateMember ||
      this.loadingMember ||
      this.memberSaving
    ) {
      return;
    }
    this.failures.clear();
    this.memberEditError = '';
    this.dialog = Dialog.EDIT;
    this.optionsReady = false;
    this.memberOptionsRequest?.unsubscribe();
    this.loadingOptions = true;
    this.memberOptionsRequest = forkJoin({
      feeTypes: this.feeTypeService.getAllAvailable(),
      contactMethods: this.contactMethodService.getAllAvailable(),
      keys: this.keyService.getAllAvailable()
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loadingOptions = false))
      )
      .subscribe({
        next: options => {
          const member = this.privateMember!;
          this.feeTypes = options.feeTypes;
          this.contactMethods = options.contactMethods;
          this.keys = options.keys;
          if (!this.feeTypes.some(fee => fee.number === member.feeType.number)) {
            this.feeTypes = [...this.feeTypes, member.feeType];
          }
          for (const channel of member.contactChannels ?? []) {
            if (!this.contactMethods.some(method => method.number === channel.method.number)) {
              this.contactMethods = [...this.contactMethods, channel.method];
            }
          }
          if (member.key != null && !this.keys.some(key => key.number === member.key)) {
            this.keys = [...this.keys, Object.assign(new Key(), { number: member.key })];
          }
          this.optionsReady = true;
        },
        error: () => (this.memberEditError = 'No se pudieron cargar las opciones. Cancela y vuelve a intentarlo.')
      });
  }

  public onCancelMemberEdit(): void {
    if (this.memberSaving) {
      return;
    }
    this.memberOptionsRequest?.unsubscribe();
    this.optionsReady = false;
    this.failures.clear();
    this.memberEditError = '';
    this.dialog = Dialog.INFO;
  }

  public onUpdateMember(data: MemberUpdate): void {
    if (
      !this.permissions.read ||
      !this.permissions.edit ||
      !this.permissions.readPrivate ||
      !this.privateMember ||
      !this.optionsReady ||
      this.dialog !== Dialog.EDIT ||
      this.memberSaving
    ) {
      return;
    }
    this.memberSaving = true;
    this.memberEditError = '';
    this.client.memberProfile
      .update(this.selectedData.number, data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.memberSaving = false))
      )
      .subscribe({
        next: updated => {
          this.privateMember = updated;
          this.selectedData = {
            number: updated.number,
            memberNumber: updated.memberNumber,
            name: updated.name,
            key: updated.key,
            renew: updated.renew
          };
          this.dialog = Dialog.INFO;
          this.failures.clear();
          this.messages.add({ severity: 'info', summary: 'Actualizado', detail: 'Socio actualizado', life: 3000 });
          this.refresh();
          if (this.selectedTab === 'keys') {
            this.loadKeys();
          }
        },
        error: error => {
          this.failures = error instanceof FailureResponse ? error.failures : new FailureStore();
          this.memberEditError = 'No se pudo actualizar el socio. Revisa los datos e inténtalo de nuevo.';
        }
      });
  }

  public onCreateOpen(): void {
    if (!this.permissions.create || this.dialog !== Dialog.NONE) {
      return;
    }
    this.dialog = Dialog.CREATE;
    this.failures.clear();
    this.creationError = '';
    this.optionsReady = false;
    this.memberOptionsRequest?.unsubscribe();
    this.loadingOptions = true;
    this.memberOptionsRequest = forkJoin({
      feeTypes: this.feeTypeService.getAllAvailable(),
      contactMethods: this.contactMethodService.getAllAvailable(),
      keys: this.keyService.getAllAvailable()
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loadingOptions = false))
      )
      .subscribe({
        next: options => {
          this.feeTypes = options.feeTypes;
          this.contactMethods = options.contactMethods;
          this.keys = options.keys;
          this.optionsReady = true;
        },
        error: () =>
          (this.creationError = 'No se pudieron cargar las opciones del formulario. Cierra y vuelve a intentarlo.')
      });
  }

  public get savingDialog(): boolean {
    return this.saving || this.savingKey || this.memberSaving;
  }

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible && !this.savingDialog) {
      this.memberOptionsRequest?.unsubscribe();
      this.memberRequest?.unsubscribe();
      this.optionsReady = false;
      this.privateMember = null;
      this.failures.clear();
      this.keyFailures.clear();
      this.creationError = '';
      this.keyCreationError = '';
      this.memberEditError = '';
      this.dialog = Dialog.NONE;
    }
  }

  public onCreate(data: MemberCreation): void {
    if (!this.permissions.create || this.dialog !== Dialog.CREATE || !this.optionsReady || this.saving) {
      return;
    }
    this.saving = true;
    this.creationError = '';
    this.client.memberProfile
      .create(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.saving = false))
      )
      .subscribe({
        next: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;
          this.messages.add({ severity: 'info', summary: 'Creado', detail: 'Socio creado', life: 3000 });
          this.refresh();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else this.failures.clear();
          this.creationError = 'No se pudo crear el socio. Revisa los datos e inténtalo de nuevo.';
        }
      });
  }

  // EVENT HANDLERS
  public onChangeDirection(sorting: SortingEvent) {
    if (sorting.field === 'fullName') {
      // TODO: should receive the actual direction, not a number
      const direction = sorting.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;
      this.sort.addField(new SortingProperty('name.firstName', direction));
      this.sort.addField(new SortingProperty('name.lastName', direction));
    } else {
      const direction = sorting.order === 1 ? SortingDirection.Ascending : SortingDirection.Descending;
      this.sort.addField(new SortingProperty(sorting.field, direction));
    }
    this.load(this.data.page);
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load();
  }

  public onFilterChange(filter: string): void {
    this.filterSubject.next(filter);
  }

  // DATA LOADING
  /** Reload the list and counters after a successful member save. */
  public refresh(): void {
    this.load(this.data.page > 0 ? this.data.page : undefined);
    this.loadSummary();
  }

  public load(page: number | undefined = undefined) {
    this.status.loading = true;
    this.service
      .getAll(page, this.sort, this.nameFilter)
      .pipe(
        switchMap(response => {
          if (response.content.length === 0 && response.page > 1) {
            const previousPage = Math.max(1, Math.min(response.page - 1, response.totalPages));
            return this.service.getAll(previousPage, this.sort, this.nameFilter);
          }
          return of(response);
        }),
        finalize(() => (this.status.loading = false))
      )
      .subscribe(response => (this.data = response));
  }

  private loadSummary() {
    this.status.loadingSummary = true;
    this.service
      .getSummary()
      .pipe(finalize(() => (this.status.loadingSummary = false)))
      .subscribe(summary => (this.memberCount = summary));
  }

}

interface Status {
  loading: boolean;
  loadingSummary: boolean;
}
