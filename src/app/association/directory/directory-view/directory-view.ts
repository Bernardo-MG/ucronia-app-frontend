import { Component, inject, OnInit } from '@angular/core';
import { MemberStatusSelector } from '@app/shared/member/member-status-selector/member-status-selector';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { SummaryCard, TextFilter } from '@bernardo-mg/ui';
import { ContactMethod, FeeType, MemberStatus } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { finalize, forkJoin, Observable, throwError } from 'rxjs';
import { ContactMethodListInnerView } from '../contact-method-list-inner-view/contact-method-list-inner-view';
import { ContactMethodService } from '../contact-method-service';
import { DirectoryService } from '../directory-service';
import { DirectorySummaryService } from '../directory-summary-service';
import { FeeTypeListInnerView } from '../fee-type-list-inner-view/fee-type-list-inner-view';
import { FeeTypeService } from '../fee-type-service';
import { GuestList } from '../guest-list/guest-list';
import { MemberProfileList } from '../member-profile-list/member-profile-list';
import { MembershipEvolutionChartView } from '../membership-evolution-chart-view/membership-evolution-chart-view.component';
import { DirectorySummary } from '../model/directory-summary';
import { FullProfile } from '../model/full-profile';
import { Profiletype } from '../model/profyle-type';
import { ProfileCreationForm, ProfileCreationFormData } from '../profile-creation-form/profile-creation-form';
import { ProfileInfoEditionForm } from '../profile-info-edition-form/profile-info-edition-form';
import { ProfileInfo } from '../profile-info/profile-info';
import { ProfileList } from '../profile-list/profile-list';
import { ProfileStatusSelector } from '../profile-type-selector/profile-status-selector';
import { SponsorList } from '../sponsor-list/sponsor-list';

@Component({
  selector: 'assoc-directory-view',
  imports: [PanelModule, ButtonModule, DialogModule, CardModule, TextFilter, ProfileCreationForm, ProfileInfoEditionForm, ProfileInfo, MembershipEvolutionChartView, ProfileList, MemberProfileList, SponsorList, GuestList, ProfileStatusSelector, MemberStatusSelector, SummaryCard, ContactMethodListInnerView, FeeTypeListInnerView],
  templateUrl: './directory-view.html'
})
export class DirectoryView implements OnInit {

  private readonly directoryService = inject(DirectoryService);
  private readonly directorySummaryService = inject(DirectorySummaryService);
  private readonly contactMethodService = inject(ContactMethodService);
  private readonly feeTypeService = inject(FeeTypeService);

  public readonly permissions: Permissions;
  public readonly filter: Filter = {
    status: MemberStatus.Active,
    type: Profiletype.ALL
  };
  public readonly status: Status = {
    loading: false,
    loadingSummary: false
  };
  protected readonly Profiletype = Profiletype;
  public readonly Dialog = Dialog;

  public infoData = new FullProfile();
  public editionData?: FullProfile;
  public contactMethodSelection: ContactMethod[] = [];
  public feeTypes: FeeType[] = [];
  public profiles = new Page<FullProfile>();
  public summary = new DirectorySummary();

  public failures = new FailureStore();

  public modalTitle = '';

  private sort = new Sorting();

  public dialog = Dialog.NONE;

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = {
      create: authService.hasPermission("profile", "create"),
      edit: authService.hasPermission("profile", "update"),
      delete: authService.hasPermission("profile", "delete")
    };
  }

  public ngOnInit(): void {
    this.load();
    this.loadSummary();
  }

  // EVENT HANDLERS

  public onShowEdit(profile: FullProfile) {
    this.dialog = Dialog.EDIT;
    this.withLoading(
      forkJoin({
        profile: this.directoryService.getOne(profile.number),
        contactMethodSelection: this.contactMethodService.getAllAvailable(),
        feeTypes: this.feeTypeService.getAllAvailable()
      })
    )
      .subscribe(({ profile, contactMethodSelection, feeTypes }) => {
        this.editionData = profile;
        this.contactMethodSelection = contactMethodSelection;
        this.feeTypes = feeTypes;
      });
  }

  public onShowInfo(profile: FullProfile) {
    this.dialog = Dialog.INFO;
    this.withLoading(
      this.directoryService.getOne(profile.number)
    )
      .subscribe(profile => this.infoData = profile);
  }

  public onChangeDirection(sorting: SortingEvent) {
    // TODO: should receive the actual direction, not a number
    const direction = sorting.order === 1
      ? SortingDirection.Ascending
      : SortingDirection.Descending;
    this.sort.addField(new SortingProperty(sorting.field, direction));

    this.load(this.profiles.page);
  }

  public onCreate(toCreate: ProfileCreationFormData): void {
    this.mutation(
      this.directoryService.create(toCreate as any),
      () => {
        this.load();
        this.loadSummary();
      }
    );
  }

  public onUpdate(toUpdate: FullProfile): void {
    const updated: FullProfile = {
      ...this.editionData,
      ...toUpdate,
      number: this.editionData?.number ?? -1
    };

    const previousTypes = this.editionData?.types ?? [];
    const newTypes = updated.types ?? [];

    this.mutation(
      this.directoryService.update(updated, previousTypes, newTypes),
      () => {
        this.load(this.profiles.page);
        this.loadSummary();
      }
    );
  }

  public onDelete(number: number) {
    this.mutation(
      this.directoryService.delete(number),
      () => {
        this.load();
        this.loadSummary();
      }
    );
  }

  public onChangeType(status: Profiletype) {
    this.filter.type = status;
    this.load();
  }

  public onChangeMemberStatus(status: MemberStatus) {
    this.filter.status = status;
    this.load();
  }

  public onFilter(filter: string) {
    this.filter.name = filter;
    this.load();
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
    this.withLoading(
      this.directoryService.getAll(page, this.sort, this.filter.status, this.filter.name, this.filter.type)
    )
      .subscribe(response => {
        this.profiles = response;
      });
  }

  private loadSummary() {
    this.status.loadingSummary = true;
    this.directorySummaryService.getSummary()
      .pipe(finalize(() => this.status.loadingSummary = false))
      .subscribe(r => this.summary = r);
  }

  // DIALOGS

  public onDialogVisibleChange(visible: boolean) {
    if (!visible) {
      this.dialog = Dialog.NONE;
    }
  }

  // PRIVATE METHODS

  private mutation(
    observable: Observable<any>,
    onSuccess?: () => void
  ) {
    this.withLoading(
      observable
    )
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.dialog = Dialog.NONE;

          onSuccess?.();
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: unknown): void {
    if (error instanceof FailureResponse) {
      this.failures = error.failures;
    } else {
      this.failures.clear();
    }
  }

  private withLoading<T>(
    observable: Observable<T>
  ): Observable<T> {
    this.status.loading = true;

    return observable.pipe(
      finalize(() => this.status.loading = false)
    );
  }

}

interface Permissions {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

interface Status {
  loading: boolean;
  loadingSummary: boolean;
}

interface Filter {
  status: MemberStatus;
  name?: string;
  type: Profiletype;
}

enum Dialog {
  NONE = 'none',
  INFO = 'info',
  EDIT = 'edit',
  CREATE = 'create'
}