import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileCreationEvent, ProfileCreationForm } from '@app/shared/contact/contact-creation-form/contact-creation-form';
import { MemberStatusSelector } from '@app/shared/contact/member-status-selector/member-status-selector';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { ContactMethod, MemberStatus } from "@ucronia/domain";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { finalize, forkJoin, Observable, throwError } from 'rxjs';
import { ContactMethodForm } from '../contact-method-form/contact-method-form';
import { ContactMethodList } from '../contact-method-list/contact-method-list';
import { ContactMethodService } from '../contact-method-service';
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
  imports: [FormsModule, PanelModule, ButtonModule, DialogModule, ToggleSwitchModule, CardModule, TextFilter, ProfileCreationForm, ProfileEditionForm, MemberProfileDetails, MembershipEvolutionChartComponent, ProfileList, MemberProfileList, SponsorList, GuestList, ProfileStatusSelector, MemberStatusSelector, ContactMethodList, ContactMethodForm],
  templateUrl: './profile-view.html'
})
export class ContactView implements OnInit {

  private readonly service = inject(ProfilesService);
  private readonly contactMethodService = inject(ContactMethodService);

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public profiles = new PaginatedResponse<ProfileInfo>();

  public contactMethodData = new PaginatedResponse<ContactMethod>();
  public contactMethodSelection: ContactMethod[] = [];

  public activeFilter = MemberStatus.All;
  public nameFilter = '';

  public selectedData = new ProfileInfo();
  public selectedContactMethodData: ContactMethod = new ContactMethod();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;
  public editing = false;
  public editingMethod = false;
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
      contactMethodSelection: this.contactMethodService.getAllAvailable(),
      contactMethods: this.contactMethodService.getAll()
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe(({ data, contactMethodSelection, contactMethods }) => {
        this.profiles = data;
        this.contactMethodSelection = contactMethodSelection;
        this.contactMethodData = contactMethods;
      });
  }

  // EVENT HANDLERS

  public onShowEdit(profile: ProfileInfo) {
    this.loading = true;
    this.editing = true;
    this.service.getOne(profile.number)
      .pipe(finalize(() => this.loading = false))
      .subscribe(profile => this.selectedData = profile);
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
    const data: ProfileInfo = {
      ...this.selectedData,
      ...toUpdate
    }
    this.mutation(
      this.service.update(data),
      () => this.load(this.currentPage())
    );
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