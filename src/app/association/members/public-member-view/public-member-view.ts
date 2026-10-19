import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ContactMethodService } from '@app/settings/contact-method-service';
import { FeeTypeService } from '@app/settings/fee-type-service';
import { KeyService } from '@app/settings/key-service';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { DrawerFormActions } from '@app/shared/ui/drawer-form-actions/drawer-form-actions';
import { DrawerHeader } from '@app/shared/ui/drawer-header/drawer-header';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MemberCount, MemberCreation, UcroniaClient } from '@ucronia/api';
import { UcroniaPermissions } from '@ucronia/auth';
import { ContactMethod, FeeType, Key, Member, PublicMember } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TabsModule } from 'primeng/tabs';
import { debounceTime, distinctUntilChanged, finalize, forkJoin, of, Subject, switchMap } from 'rxjs';
import { MemberCreationForm } from '../../members/member-creation-form/member-creation-form';
import { MemberKeyList } from '../member-key-list/member-key-list';
import { PublicMemberList } from '../public-member-list/public-member-list';
import { PublicMemberService } from '../public-member-service';

@Component({
  selector: 'assoc-public-member-view',
  imports: [TabsModule, MemberKeyList, DrawerHeader, DrawerFormActions, DrawerModule, ButtonModule, MessageModule, MemberCreationForm, FormsModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, PublicMemberList],
  templateUrl: './public-member-view.html'
})
export class PublicMemberView implements OnInit {

  private readonly service = inject(PublicMemberService);

  private readonly client = inject(UcroniaClient);

  private readonly feeTypeService = inject(FeeTypeService);

  private readonly contactMethodService = inject(ContactMethodService);

  private readonly keyService = inject(KeyService);

  private readonly messages = inject(MessageService);

  public readonly permissions = {
    keysRead: inject(AuthService).hasPermission(UcroniaPermissions.key.read),
    create: inject(AuthService).hasPermission(UcroniaPermissions.directory.memberProfile.create)
  };
  public selectedTab = 'members';
  public creating = false;
  public saving = false;
  public loadingOptions = false;
  public optionsReady = false;
  public creationError = '';
  public feeTypes: FeeType[] = [];
  public contactMethods: ContactMethod[] = [];
  public keys: Key[] = [];
  public data = new Page<PublicMember>();
  public selectedData = new PublicMember();
  public memberContact = new Member();
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

  public onTabChange(value: string | number | undefined): void {
    if (value === 'keys' && !this.permissions.keysRead) {
      return;
    }
    this.selectedTab = value === 'keys' ? 'keys' : 'members';
  }

  public onCreateOpen(): void {
    if (!this.permissions.create || this.creating) {
      return;
    }
    this.creating = true;
    this.failures.clear();
    this.creationError = '';
    this.optionsReady = false;
    this.loadingOptions = true;
    forkJoin({
      feeTypes: this.feeTypeService.getAllAvailable(),
      contactMethods: this.contactMethodService.getAllAvailable(),
      keys: this.keyService.getAllAvailable()
    })
      .pipe(finalize(() => (this.loadingOptions = false)))
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

  public onDrawerVisibleChange(visible: boolean): void {
    if (!visible && !this.saving) {
      this.creating = false;
      this.failures.clear();
      this.creationError = '';
    }
  }

  public onCreate(data: MemberCreation): void {
    if (!this.permissions.create || !this.creating || !this.optionsReady || this.saving) {
      return;
    }
    this.saving = true;
    this.creationError = '';
    this.client.memberProfile
      .create(data)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.creating = false;
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

  public ngOnInit(): void {
    this.refresh();
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
