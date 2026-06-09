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
  public readonly filter = new DirectoryFilter();
  public readonly status = new Status();

  public selectedData = new FullProfile();
  public contactMethodSelection: ContactMethod[] = [];
  public feeTypes: FeeType[] = [];
  public profiles = new Page<FullProfile>();
  public summary = new DirectorySummary();

  public failures = new FailureStore();

  public modalTitle = '';
  
  private sort = new Sorting();


  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.permissions = new Permissions(
      authService.hasPermission("profile", "create"),
      authService.hasPermission("profile", "update"),
      authService.hasPermission("profile", "delete")
    );
  }

  public ngOnInit(): void {
    this.load();
    this.loadSummary();
  }

  // EVENT HANDLERS

  public onShowEdit(profile: FullProfile) {
    this.status.loading = true;
    this.status.editing = true;
    forkJoin({
      profile: this.directoryService.getOne(profile.number),
      contactMethodSelection: this.contactMethodService.getAllAvailable(),
      feeTypes: this.feeTypeService.getAllAvailable()
    })
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(({ profile, contactMethodSelection, feeTypes }) => {
        this.selectedData = profile;
        this.contactMethodSelection = contactMethodSelection;
        this.feeTypes = feeTypes;
      });
  }

  public onChangeDirection(sorting: SortingEvent) {
    let direction;
    if (sorting.field === 'fullName') {
      const direction = sorting.order === 1
        ? SortingDirection.Ascending
        : SortingDirection.Descending;
      this.sort.addField(new SortingProperty('name.firstName', direction));
      this.sort.addField(new SortingProperty('name.lastName', direction));
    } else {
      if (sorting.order == 1) {
        direction = SortingDirection.Ascending;
      } else {
        direction = SortingDirection.Descending;
      }
      this.sort.addField(new SortingProperty(sorting.field, direction));
    }

    this.load(this.profiles.page);
  }

  public onShowInfo(profile: FullProfile) {
    this.status.loading = true;
    this.status.showing = true;
    this.directoryService.getOne(profile.number)
      .pipe(finalize(() => this.status.loading = false))
      .subscribe(profile => this.selectedData = profile);
  }

  public onNameFilterChange(): void {
    this.load();
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
      ...this.selectedData,
      ...toUpdate,
      number: this.selectedData.number
    };

    const previousTypes = this.selectedData.types ?? [];
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

  public onChangeStatusFilter(status: 'all' | 'member' | 'guest' | 'sponsor') {
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
    this.status.loading = true;

    this.directoryService.getAll(page, this.sort, this.filter.status, this.filter.name, this.filter.type)
      .pipe(finalize(() => this.status.loading = false))
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

  // PRIVATE METHODS

  private mutation(
    observable: Observable<any>,
    onSuccess: () => void = () => { }
  ) {
    this.status.loading = true;
    observable
      .pipe(finalize(() => this.status.loading = false))
      .subscribe({
        complete: () => {
          this.failures.clear();
          this.status.editing = false;
          this.status.creating = false;

          onSuccess();
        },
        error: error => {
          if (error instanceof FailureResponse) {
            this.failures = error.failures;
          } else {
            this.failures.clear();
          }
          return throwError(() => error);
        }
      });
  }

}

class Permissions {
  public readonly create: boolean;
  public readonly edit: boolean;
  public readonly delete: boolean;

  constructor(
    createable: boolean,
    editable: boolean,
    deletable: boolean
  ) {
    this.create = createable;
    this.edit = editable;
    this.delete = deletable;
  }

}

class DirectoryFilter {

  public status: MemberStatus = MemberStatus.Active;
  public name: string | undefined = undefined;
  public type: 'all' | 'member' | 'guest' | 'sponsor' = 'all';

}

class Status {

  public loading = false;
  public loadingSummary = false;
  public editing = false;
  public creating = false;
  public showing = false;

}
