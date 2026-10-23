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
import { MemberCount, MemberCreation, MemberUpdate } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { ContactMethod, FeeType, Key, KeyAssignment, Member, PublicMember } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TabsModule } from 'primeng/tabs';
import { debounceTime, distinctUntilChanged, finalize, forkJoin, Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { MemberCreationForm } from '../../members/member-creation-form/member-creation-form';
import { MemberEditionForm } from '../member-edition-form/member-edition-form';
import { MemberInfo } from '../member-info/member-info';
import { MemberKeyForm } from '../member-key-form/member-key-form';
import { MemberKeyInfo } from '../member-key-info/member-key-info';
import { MemberKeyList } from '../member-key-list/member-key-list';
import { MemberKeyService } from '../member-key-service';
import { MemberProfileService } from '../member-profile-service';
import { Dialog } from '../members-dialog';
import { PublicMemberList } from '../public-member-list/public-member-list';
import { PublicMemberService } from '../public-member-service';

@Component({
  selector: 'assoc-public-member-view',
  imports: [MemberInfo, MemberEditionForm, MemberKeyInfo, DrawerActions, MemberKeyForm, TabsModule, MemberKeyList, DrawerHeader, DrawerFormActions, DrawerModule, ButtonModule, MessageModule, MemberCreationForm, FormsModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, PublicMemberList],
  templateUrl: './public-member-view.html'
})
export class PublicMemberView implements OnInit, OnDestroy {

  private readonly service = inject(PublicMemberService);
  private readonly memberProfileService = inject(MemberProfileService);
  private readonly feeTypeService = inject(FeeTypeService);
  private readonly contactMethodService = inject(ContactMethodService);
  private readonly keyService = inject(MemberKeyService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);

  private keysReloadRequested = false;
  private memberRequest?: Subscription;
  private memberOptionsRequest?: Subscription;

  public readonly permissions: Permissions;

  public selectedTab = 'members';
  public dialog = Dialog.NONE;
  public readonly Dialog = Dialog;
  public selectedKey: KeyAssignment | undefined;
  public keyAssignments: KeyAssignment[] = [];
  public privateMember: Member | null = null;
  public feeTypes: FeeType[] = [];
  public contactMethods: ContactMethod[] = [];
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
    loadingSummary: false,
    loadingKeys: false,
    loadingMember: false,
    loadingOptions: false,
    saving: false,
    optionsReady: false,
    keysError: false,
    memberPrivateError: false
  };
  public failures = new FailureStore();
  public error = '';
  private nameFilter = '';
  public filterValue = '';
  private readonly filterSubject = new Subject<string>();

  constructor() {
    const authService = inject(AuthService);
    this.permissions = {
      read: authService.hasPermission(UcroniaPermissions.directory.member.read),
      readPrivate: authService.hasPermission(UcroniaPermissions.directory.memberProfile.read),
      create: authService.hasPermission(UcroniaPermissions.directory.memberProfile.create),
      edit: authService.hasPermission(UcroniaPermissions.directory.memberProfile.update),
      delete: authService.hasPermission(UcroniaPermissions.directory.memberProfile.delete),
      keyAssignmentsRead: authService.hasPermission(UcroniaPermissions.keyAssignment.read),
      keysCreate: authService.hasPermission(UcroniaPermissions.key.create),
      keysEdit: authService.hasPermission(UcroniaPermissions.key.update),
      keysDelete: authService.hasPermission(UcroniaPermissions.key.delete)
    };
    this.filterSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
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
    if (value === 'keys' && !this.permissions.keyAssignmentsRead) {
      return;
    }
    this.selectedTab = value === 'keys' ? 'keys' : 'members';
    if (this.selectedTab === 'keys') {
      this.loadKeys();
    }
  }

  public onCreateKeyOpen(): void {
    if (
      !this.permissions.keyAssignmentsRead ||
      !this.permissions.keysCreate ||
      this.selectedTab !== 'keys' ||
      this.dialog !== Dialog.NONE
    ) {
      return;
    }
    this.failures.clear();
    this.error = '';
    this.dialog = Dialog.KEY_CREATE;
  }

  public onCreateKey(data: Key): void {
    if (
      !this.permissions.keyAssignmentsRead ||
      !this.permissions.keysCreate ||
      this.dialog !== Dialog.KEY_CREATE ||
      this.status.saving
    ) {
      return;
    }
    this.call(
      () => this.keyService.create(data),
      () => this.loadKeys(),
      'No se pudo crear la llave. Revisa los datos e inténtalo de nuevo.'
    );
  }

  public loadKeys(): void {
    if (!this.permissions.keyAssignmentsRead) {
      return;
    }
    if (this.status.loadingKeys) {
      this.keysReloadRequested = true;
      return;
    }
    this.status.loadingKeys = true;
    this.status.keysError = false;
    this.keyService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.status.loadingKeys = false;
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
          this.status.keysError = true;
          this.keyAssignments = [];
        }
      });
  }

  public onShowKey(data: KeyAssignment): void {
    if (!this.permissions.keyAssignmentsRead || this.status.saving) {
      return;
    }
    this.selectedKey = data;
    this.failures.clear();
    this.error = '';
    this.dialog = Dialog.KEY_INFO;
  }

  public onShowKeyEdit(): void {
    if (!this.permissions.keyAssignmentsRead || !this.permissions.keysEdit || !this.selectedKey || this.status.saving) {
      return;
    }
    this.failures.clear();
    this.error = '';
    this.dialog = Dialog.KEY_EDIT;
  }

  public onCancelKeyEdit(): void {
    if (!this.status.saving) {
      this.failures.clear();
      this.error = '';
      this.dialog = Dialog.KEY_INFO;
    }
  }

  public onUpdateKey(data: Key): void {
    if (
      !this.permissions.keyAssignmentsRead ||
      !this.permissions.keysEdit ||
      !this.selectedKey ||
      this.dialog !== Dialog.KEY_EDIT ||
      this.status.saving
    ) {
      return;
    }
    const number = this.selectedKey.number;
    this.call(
      () => this.keyService.update({ ...data, number }),
      () => this.refreshKeysAndMembers(),
      'No se pudo actualizar la llave.'
    );
  }

  public onDeleteKey(event: Event): void {
    if (
      !this.permissions.keyAssignmentsRead ||
      !this.permissions.keysDelete ||
      !this.selectedKey ||
      this.dialog !== Dialog.KEY_INFO ||
      this.status.saving
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
          !this.status.saving &&
          this.dialog === Dialog.KEY_INFO &&
          this.selectedKey?.number === number
        ) {
          this.call(
            () => this.keyService.delete(number),
            () => this.refreshKeysAndMembers(),
            'No se pudo borrar la llave.'
          );
        }
      }
    });
  }

  public onDeleteMember(event: Event): void {
    if (!this.permissions.read || !this.permissions.delete || this.dialog !== Dialog.INFO || this.status.saving) {
      return;
    }
    const number = this.selectedData.number;
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es reversible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: { label: 'Cancelar', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Borrar', severity: 'danger' },
      accept: () => {
        if (
          !this.destroyRef.destroyed &&
          !this.status.saving &&
          this.dialog === Dialog.INFO &&
          this.selectedData.number === number
        ) {
          this.call(
            () => this.memberProfileService.delete(number),
            () => {
              this.memberRequest?.unsubscribe();
              this.refreshKeysAndMembers();
            },
            'No se pudo borrar el socio. Inténtalo de nuevo.'
          );
        }
      }
    });
  }

  public onShowMember(member: PublicMember): void {
    if (!this.permissions.read || this.status.saving) {
      return;
    }
    this.memberOptionsRequest?.unsubscribe();
    this.memberRequest?.unsubscribe();
    this.selectedData = member;
    this.privateMember = null;
    this.status.memberPrivateError = false;
    this.dialog = Dialog.INFO;
    this.status.loadingMember = false;
    this.error = '';
    if (this.permissions.readPrivate) {
      this.loadPrivateMember();
    }
  }

  public loadPrivateMember(): void {
    if (
      !this.permissions.read ||
      !this.permissions.readPrivate ||
      (this.dialog !== Dialog.INFO && this.dialog !== Dialog.EDIT)
    ) {
      return;
    }
    this.memberRequest?.unsubscribe();
    this.status.loadingMember = true;
    this.status.memberPrivateError = false;
    this.memberRequest = this.memberProfileService
      .getOne(this.selectedData.number)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.status.loadingMember = false))
      )
      .subscribe({
        next: member => (this.privateMember = member),
        error: () => (this.status.memberPrivateError = true)
      });
  }

  public onShowMemberEdit(): void {
    if (
      !this.permissions.read ||
      !this.permissions.edit ||
      !this.permissions.readPrivate ||
      this.dialog !== Dialog.INFO ||
      !this.privateMember ||
      this.status.loadingMember ||
      this.status.saving
    ) {
      return;
    }
    this.failures.clear();
    this.error = '';
    this.dialog = Dialog.EDIT;
    this.status.optionsReady = false;
    this.memberOptionsRequest?.unsubscribe();
    this.status.loadingOptions = true;
    this.memberOptionsRequest = forkJoin({
      feeTypes: this.feeTypeService.getAllAvailable(),
      contactMethods: this.contactMethodService.getAllAvailable()
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.status.loadingOptions = false))
      )
      .subscribe({
        next: options => {
          const member = this.privateMember!;
          this.feeTypes = options.feeTypes;
          this.contactMethods = options.contactMethods;
          if (!this.feeTypes.some(fee => fee.number === member.feeType.number)) {
            this.feeTypes = [...this.feeTypes, member.feeType];
          }
          for (const channel of member.contactChannels ?? []) {
            if (!this.contactMethods.some(method => method.number === channel.method.number)) {
              this.contactMethods = [...this.contactMethods, channel.method];
            }
          }
          this.status.optionsReady = true;
        },
        error: () => (this.error = 'No se pudieron cargar las opciones. Cancela y vuelve a intentarlo.')
      });
  }

  public onCancelMemberEdit(): void {
    if (this.status.saving) {
      return;
    }
    this.memberOptionsRequest?.unsubscribe();
    this.status.optionsReady = false;
    this.failures.clear();
    this.error = '';
    this.dialog = Dialog.INFO;
  }

  public onUpdateMember(data: MemberUpdate): void {
    if (
      !this.permissions.read ||
      !this.permissions.edit ||
      !this.permissions.readPrivate ||
      !this.privateMember ||
      !this.status.optionsReady ||
      this.dialog !== Dialog.EDIT ||
      this.status.saving
    ) {
      return;
    }
    const number = this.selectedData.number;
    this.call(
      () => this.memberProfileService.update(number, data),
      () => {
        this.refresh();
        if (this.selectedTab === 'keys') {
          this.loadKeys();
        }
      },
      'No se pudo actualizar el socio. Revisa los datos e inténtalo de nuevo.'
    );
  }

  public onCreateOpen(): void {
    if (!this.permissions.create || this.dialog !== Dialog.NONE) {
      return;
    }
    this.dialog = Dialog.CREATE;
    this.failures.clear();
    this.error = '';
    this.status.optionsReady = false;
    this.memberOptionsRequest?.unsubscribe();
    this.status.loadingOptions = true;
    this.memberOptionsRequest = forkJoin({
      feeTypes: this.feeTypeService.getAllAvailable(),
      contactMethods: this.contactMethodService.getAllAvailable()
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.status.loadingOptions = false))
      )
      .subscribe({
        next: options => {
          this.feeTypes = options.feeTypes;
          this.contactMethods = options.contactMethods;
          this.status.optionsReady = true;
        },
        error: () => (this.error = 'No se pudieron cargar las opciones del formulario. Cierra y vuelve a intentarlo.')
      });
  }

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible && !this.status.saving) {
      this.memberOptionsRequest?.unsubscribe();
      this.memberRequest?.unsubscribe();
      this.status.optionsReady = false;
      this.privateMember = null;
      this.failures.clear();
      this.error = '';
      this.dialog = Dialog.NONE;
    }
  }

  public onCreate(data: MemberCreation): void {
    if (!this.permissions.create || this.dialog !== Dialog.CREATE || !this.status.optionsReady || this.status.saving) {
      return;
    }
    this.call(
      () => this.memberProfileService.create(data),
      () => this.refresh(),
      'No se pudo crear el socio. Revisa los datos e inténtalo de nuevo.'
    );
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

  private refreshKeysAndMembers(): void {
    this.loadKeys();
    this.refresh();
  }

  private call<T>(action: () => Observable<T>, onSuccess: () => void, message: string): void {
    this.status.saving = true;
    this.error = '';
    action()
      .pipe(
        // Cancellation must not run the successful-completion handler.
        tap({
          complete: () => {
            this.failures.clear();
            this.privateMember = null;
            this.status.optionsReady = false;
            this.dialog = Dialog.NONE;
            onSuccess();
          }
        }),
        finalize(() => (this.status.saving = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({ error: error => this.handleError(error, message) });
  }

  private handleError(error: unknown, message: string): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
    this.error = message;
  }

}

interface Permissions {
  read: boolean;
  readPrivate: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  keyAssignmentsRead: boolean;
  keysCreate: boolean;
  keysEdit: boolean;
  keysDelete: boolean;
}

interface Status {
  loading: boolean;
  loadingSummary: boolean;
  loadingKeys: boolean;
  loadingMember: boolean;
  loadingOptions: boolean;
  saving: boolean;
  optionsReady: boolean;
  keysError: boolean;
  memberPrivateError: boolean;
}
