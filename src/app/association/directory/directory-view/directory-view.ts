import { Component, inject, OnInit } from '@angular/core';
import { ProfileCreationForm, ProfileCreationFormData } from '@app/association/directory/profile-creation-form/profile-creation-form';
import { MemberStatusSelector } from '@app/shared/member/member-status-selector/member-status-selector';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, Page, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { ContactMethod, FeeType, MemberStatus } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { finalize, forkJoin, Observable, throwError } from 'rxjs';
import { ContactMethodListInnerView } from '../contact-method-list-inner-view/contact-method-list-inner-view';
import { ContactMethodService } from '../contact-method-service';
import { DirectoryReportService } from '../directory-report-service';
import { DirectoryService } from '../directory-service';
import { FeeTypeListInnerView } from '../fee-type-list-inner-view/fee-type-list-inner-view';
import { FeeTypeService } from '../fee-type-service';
import { GuestList } from '../guest-list/guest-list';
import { MemberProfileList } from '../member-profile-list/member-profile-list';
import { MembershipEvolutionChartView } from '../membership-evolution-chart-view/membership-evolution-chart-view.component';
import { DirectoryReport } from '../model/directory-status-report';
import { ProfileInfo } from '../model/profile-info';
import { ProfileDetails } from '../profile-details/profile-details';
import { ProfileInfoEditionForm } from '../profile-info-edition-form/profile-info-edition-form';
import { ProfileList } from '../profile-list/profile-list';
import { ProfileStatusSelector } from '../profile-type-selector/profile-status-selector';
import { SponsorList } from '../sponsor-list/sponsor-list';

@Component({
  selector: 'assoc-directory-view',
  imports: [PanelModule, ButtonModule, DialogModule, CardModule, TextFilter, ProfileCreationForm, ProfileInfoEditionForm, ProfileDetails, MembershipEvolutionChartView, ProfileList, MemberProfileList, SponsorList, GuestList, ProfileStatusSelector, MemberStatusSelector, ContactMethodListInnerView, FeeTypeListInnerView],
  templateUrl: './directory-view.html'
})
export class DirectoryView implements OnInit {

  private readonly profileService = inject(DirectoryService);
  private readonly directoryReportService = inject(DirectoryReportService);
  private readonly contactMethodService = inject(ContactMethodService);
  private readonly feeTypeService = inject(FeeTypeService);

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public profiles = new Page<ProfileInfo>();

  public activeFilter = MemberStatus.Active;
  public nameFilter = '';

  public selectedData = new ProfileInfo();
  public contactMethodSelection: ContactMethod[] = [];
  public feeTypes: FeeType[] = [];
  public report = new DirectoryReport();

  /**
   * Loading flag.
   */
  public loading = false;
  public editing = false;
  public creating = false;
  public showing = false;

  public failures = new FailureStore();

  public modalTitle = '';

  public selectedStatus: 'all' | 'member' | 'guest' | 'sponsor' = 'all';

  private sort = new Sorting();

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("profile", "create");
    this.editable = authService.hasPermission("profile", "update");
    this.deletable = authService.hasPermission("profile", "delete");
  }

  public ngOnInit(): void {
    this.load();
    this.directoryReportService.getReport()
      .subscribe(r => this.report = r);
  }

  // EVENT HANDLERS

  public onShowEdit(profile: ProfileInfo) {
    this.loading = true;
    this.editing = true;
    forkJoin({
      profile: this.profileService.getOne(profile.number),
      contactMethodSelection: this.contactMethodService.getAllAvailable(),
      feeTypes: this.feeTypeService.getAllAvailable()
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe(({ profile, contactMethodSelection, feeTypes }) => {
        this.selectedData = profile;
        this.contactMethodSelection = contactMethodSelection;
        this.feeTypes = feeTypes;
      });
  }

  public onChangeActiveFilter(active: MemberStatus) {
    this.activeFilter = active;
    this.load();
  }

  public onChangeDirection(sorting: SortingEvent) {
    let direction;
    if (sorting.field === 'fullName') {
      const direction = sorting.order === 1
        ? SortingDirection.Ascending
        : SortingDirection.Descending;
      this.sort.addField(new SortingProperty('firstName', direction));
      this.sort.addField(new SortingProperty('lastName', direction));
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

  public onShowInfo(profile: ProfileInfo) {
    this.loading = true;
    this.showing = true;
    this.profileService.getOne(profile.number)
      .pipe(finalize(() => this.loading = false))
      .subscribe(profile => this.selectedData = profile);
  }

  public onNameFilterChange(): void {
    this.load();
  }

  public onCreate(toCreate: ProfileCreationFormData): void {
    this.mutation(
      this.profileService.create(toCreate as any),
      () => {
        this.load();
        this.directoryReportService.getReport()
          .subscribe(r => this.report = r);
      }
    );
  }

  public onUpdate(toUpdate: ProfileInfo): void {
    const updated: ProfileInfo = {
      ...this.selectedData,
      ...toUpdate,
      number: this.selectedData.number
    };

    const previousTypes = this.selectedData.types ?? [];
    const newTypes = updated.types ?? [];

    this.mutation(
      this.profileService.fullUpdate(updated, previousTypes, newTypes),
      () => this.load(this.profiles.page)
    );
  }

  public onDelete(number: number) {
    this.mutation(
      this.profileService.delete(number),
      () => {
        this.load();
        this.directoryReportService.getReport()
          .subscribe(r => this.report = r);
      }
    );
  }

  public onChangeStatusFilter(status: 'all' | 'member' | 'guest' | 'sponsor') {
    this.selectedStatus = status;
    this.load();
  }

  public onChangeMemberStatus(status: MemberStatus) {
    this.activeFilter = status;
    this.load();
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load();
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
    this.loading = true;

    this.profileService.getAll(page, this.sort, this.activeFilter, this.nameFilter, this.selectedStatus)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        this.profiles = response;
      });
  }

  // PRIVATE METHODS

  private mutation(
    observable: Observable<any>,
    onSuccess: () => void = () => { }
  ) {
    this.loading = true;
    observable
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.editing = false;
          this.creating = false;

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