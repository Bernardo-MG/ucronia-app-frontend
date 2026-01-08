import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberStatusSelector } from '@app/association/profiles/member-status-selector/member-status-selector';
import { ProfileCreationEvent, ProfileCreationForm } from '@app/association/profiles/profile-creation-form/profile-creation-form';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { ContactMethod, FeeType, MemberStatus } from "@ucronia/domain";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { finalize, forkJoin, Observable, throwError } from 'rxjs';
import { ContactMethodForm } from '../contact-method-form/contact-method-form';
import { ContactMethodList } from '../contact-method-list/contact-method-list';
import { ContactMethodService } from '../contact-method-service';
import { FeeTypeForm } from '../fee-type-form/fee-type-form';
import { FeeTypeList } from '../fee-type-list/fee-type-list';
import { FeeTypeService } from '../fee-type-service';
import { GuestList } from '../guest-list/guest-list';
import { MemberProfileDetails } from '../member-profile-details/member-profile-details';
import { MemberProfileList } from '../member-profile-list/member-profile-list';
import { MembershipEvolutionChartComponent } from '../membership-evolution-chart/membership-evolution-chart.component';
import { ProfileInfo } from '../model/contact-info';
import { ProfileEditionForm } from '../profile-edition-form/profile-edition-form';
import { ProfileList } from '../profile-list/profile-list';
import { ProfileStatusSelector } from '../profile-type-selector/profile-status-selector';
import { ProfilesService } from '../profiles-service';
import { SponsorList } from '../sponsor-list/sponsor-list';

@Component({
  selector: 'assoc-profile-view',
  imports: [FormsModule, PanelModule, ButtonModule, DialogModule, ToggleSwitchModule, CardModule, TextFilter, ProfileCreationForm, ProfileEditionForm, MemberProfileDetails, MembershipEvolutionChartComponent, ProfileList, MemberProfileList, SponsorList, GuestList, ProfileStatusSelector, MemberStatusSelector, ContactMethodList, ContactMethodForm, FeeTypeList, FeeTypeForm],
  templateUrl: './profile-view.html'
})
export class ProfileView implements OnInit {

  private readonly service = inject(ProfilesService);
  private readonly contactMethodService = inject(ContactMethodService);
  private readonly feeTypeService = inject(FeeTypeService);

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public profiles = new PaginatedResponse<ProfileInfo>();

  public activeFilter = MemberStatus.All;
  public nameFilter = '';

  public selectedData = new ProfileInfo();
  public selectedContactMethodData = new ContactMethod();
  public contactMethodData = new PaginatedResponse<ContactMethod>();
  public contactMethodSelection: ContactMethod[] = [];
  public selectedFeeTypeData = new FeeType();
  public feeTypes: FeeType[] = [];
  public feeTypeData = new PaginatedResponse<FeeType>();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;
  public editing = false;
  public editingMethod = false;
  public editingFeeType = false;
  public creating = false;
  public creatingMethod = false;
  public saving = false;
  public showing = false;

  public failures = new FailureStore();

  public modalTitle = '';

  public selectedStatus: 'all' | 'member' | 'guest' | 'sponsor' = 'all';

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("profile", "create");
    this.editable = authService.hasPermission("profile", "update");
    this.deletable = authService.hasPermission("profile", "delete");
  }

  public ngOnInit(): void {
    this.loading = true;
    forkJoin({
      data: this.service.getAll(undefined, this.sort, this.activeFilter, this.nameFilter, this.selectedStatus),
      contactMethods: this.contactMethodService.getAll(),
      feeTypes: this.feeTypeService.getAll()
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe(({ data, contactMethods, feeTypes }) => {
        this.profiles = data;
        this.contactMethodData = contactMethods;
        this.feeTypeData = feeTypes;
      });
  }

  // EVENT HANDLERS

  public onShowEdit(profile: ProfileInfo) {
    this.loading = true;
    this.editing = true;
    forkJoin({
      profile: this.service.getOne(profile.number),
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

    this.load(this.currentPage());
  }

  public onShowInfo(profile: ProfileInfo) {
    this.loading = true;
    this.showing = true;
    this.service.getOne(profile.number)
      .pipe(finalize(() => this.loading = false))
      .subscribe(profile => this.selectedData = profile);
  }

  public onNameFilterChange(): void {
    this.load();
  }

  public onCreate(toCreate: ProfileCreationEvent): void {
    this.mutation(
      this.service.create(toCreate as any),
      () => this.load()
    );
  }

  public onUpdate(toUpdate: ProfileInfo): void {
    const updated: ProfileInfo = {
      ...this.selectedData,
      ...toUpdate
    };

    const previousTypes = this.selectedData.types ?? [];
    const newTypes = updated.types ?? [];

    // Find added types
    const addedTypes = newTypes.filter(t => !previousTypes.includes(t));

    let conversions: Observable<any>[] = [];

    // Create conversion calls for new types
    for (const type of addedTypes) {
      switch (type) {
        case 'member':
          conversions.push(this.service.convertToMember(updated.number));
          break;

        case 'guest':
          conversions.push(this.service.convertToGuest(updated.number));
          break;

        case 'sponsor':
          conversions.push(this.service.convertToSponsor(updated.number));
          break;
      }
    }

    if (conversions.length === 0) {
      return this.mutation(
        this.service.update(updated),
        () => this.load(this.currentPage())
      );
    }

    this.loading = true;

    forkJoin(conversions)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          // Then perform regular update
          this.mutation(
            this.service.update(updated),
            () => this.load(this.currentPage())
          );
        },
        error: err => console.error(err)
      });
  }

  public onDelete(number: number) {
    this.mutation(
      this.service.delete(number),
      () => this.load()
    );
  }

  public onShowEditContactMethod(contactMethod: ContactMethod) {
    this.selectedContactMethodData = contactMethod;
    this.editingMethod = true;
  }

  public onCreateContactMethod(toCreate: ContactMethod): void {
    this.mutation(
      this.contactMethodService.create(toCreate),
      () => this.loadContactMethods(0)
    );
  }

  public onUpdateContactMethod(toUpdate: ContactMethod): void {
    this.mutation(
      this.contactMethodService.update(toUpdate),
      () => this.loadContactMethods(this.currentPage())
    );
  }

  public onDeleteContactMethod(number: number): void {
    this.mutation(
      this.contactMethodService.delete(number),
      () => this.loadContactMethods(0)
    );
  }

  public onShowEditFeeType(contactMethod: FeeType) {
    this.selectedFeeTypeData = contactMethod;
    this.editingFeeType = true;
  }

  public onCreateFeeType(toCreate: FeeType): void {
    this.mutation(
      this.feeTypeService.create(toCreate),
      () => this.loadContactMethods(0)
    );
  }

  public onUpdateFeeType(toUpdate: FeeType): void {
    this.mutation(
      this.feeTypeService.update(toUpdate),
      () => this.loadContactMethods(this.currentPage())
    );
  }

  public onDeleteFeeType(number: number): void {
    this.mutation(
      this.feeTypeService.delete(number),
      () => this.loadContactMethods(0)
    );
  }

  public onChangeStatusFilter(status: 'all' | 'member' | 'guest' | 'sponsor') {
    this.selectedStatus = status;
    this.load();
  }

  public onChangeMemberStatus(status: 'all' | 'active' | 'inactive') {
    if (status === 'all') {
      this.activeFilter = MemberStatus.All;
    } else if (status === 'active') {
      this.activeFilter = MemberStatus.Active;
    } else if (status === 'inactive') {
      this.activeFilter = MemberStatus.Inactive;
    }
    this.load();
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load();
  }

  public onTypeSelected(type: string) {
    let observable: Observable<any> | undefined = undefined;
    if (type === 'member') {
      this.loading = true;
      observable = this.service.convertToMember(this.selectedData.number);
    } else if (type === 'sponsor') {
      this.loading = true;
      observable = this.service.convertToSponsor(this.selectedData.number);
    } else if (type === 'guest') {
      this.loading = true;
      observable = this.service.convertToGuest(this.selectedData.number);
    }

    if (observable !== undefined) {
      this.loading = true;
      observable.pipe(finalize(() => this.loading = false))
        .pipe(finalize(() => this.editing = false))
        .pipe(finalize(() => this.loading = false))
        .subscribe(() => this.load());
    }
  }

  // DATA LOADING

  public load(page: number | undefined = undefined) {
    this.loading = true;

    this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter, this.selectedStatus)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        this.profiles = response;
      });
  }

  public loadContactMethods(page: number): void {
    this.loading = true;

    this.contactMethodService.getAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.contactMethodData = response);
  }

  public loadFeeTypes(page: number): void {
    this.loading = true;

    this.feeTypeService.getAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.feeTypeData = response);
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
          this.creatingMethod = false;
          this.editingMethod = false;

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

  private currentPage(): number {
    return this.profiles.page;
  }

}