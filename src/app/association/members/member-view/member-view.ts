import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberProfileDetails } from '@app/association/profiles/member-profile-details/member-profile-details';
import { ProfileCreationEvent, ProfileCreationForm } from '@app/shared/contact/contact-creation-form/contact-creation-form';
import { MemberStatusSelector } from '@app/shared/contact/member-status-selector/member-status-selector';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { ContactMethod, Member, MemberProfile, MemberStatus } from "@ucronia/domain";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { TablePageEvent } from 'primeng/table';
import { finalize, forkJoin, Observable, Subject, throwError } from 'rxjs';
import { MemberProfileMethodService } from '../member-contact-method-service';
import { MemberEditionForm } from '../member-edition-form/member-edition-form';
import { MemberList } from '../member-list/member-list';
import { MemberService } from '../member-service';

@Component({
  selector: 'assoc-member-view',
  imports: [FormsModule, PanelModule, DialogModule, CardModule, ButtonModule, MemberList, TextFilter, MemberProfileDetails, ProfileCreationForm, MemberStatusSelector, MemberEditionForm],
  templateUrl: './member-view.html'
})
export class MemberView implements OnInit {

  private readonly service = inject(MemberService);
  private readonly memberProfileMethodService = inject(MemberProfileMethodService);

  public data = new PaginatedResponse<Member>();
  public contactMethodSelection: ContactMethod[] = [];

  public selectedData = new Member();
  public memberContact = new MemberProfile();

  private sort = new Sorting();

  public readonly readProfile;
  public readonly createable;
  public readonly deletable;
  public readonly editable;

  public loading = false;
  public showing = false;
  public creating = false;
  public editing = false;
  public saving = false;

  public failures = new FailureStore();

  public activeFilter = MemberStatus.Active;
  public nameFilterSubject = new Subject<string>();
  public nameFilter = '';

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("profile", "create");
    this.deletable = authService.hasPermission("profile", "delete");
    this.editable = authService.hasPermission("profile", "update");
    this.readProfile = authService.hasPermission("profile", "read");
  }

  public ngOnInit(): void {
    this.loading = true;
    forkJoin({
      data: this.service.getAll(1, this.sort, this.activeFilter, this.nameFilter),
      contactMethods: this.memberProfileMethodService.getAll()
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe(({ data, contactMethods }) => {
        this.data = data;
        this.contactMethodSelection = contactMethods;
      });
  }

  // EVENT HANDLERS

  public onChangeDirection(sorting: SortingEvent) {
    if (sorting.field === 'fullName') {
      const direction = sorting.order === 1
        ? SortingDirection.Ascending
        : SortingDirection.Descending;
      this.sort.addField(new SortingProperty('firstName', direction));
      this.sort.addField(new SortingProperty('lastName', direction));
    }

    this.load(this.data.page);
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onShowContact(member: Member) {
    this.selectedData = member;
    this.loading = true;
    this.service.getContact(member.number)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.memberContact = response);
    this.showing = true;
  }

  public onChangeMemberStatus(status: 'all' | 'active' | 'inactive') {
    if (status === 'all') {
      this.activeFilter = MemberStatus.All;
    } else if (status === 'active') {
      this.activeFilter = MemberStatus.Active;
    } else if (status === 'inactive') {
      this.activeFilter = MemberStatus.Inactive;
    }
    this.load(0);
  }

  public onStartCreating(): void {
    this.creating = true;
  }

  public onStartEditing(member: Member) {
    this.service.getContact(member.number)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.memberContact = response);
    this.editing = true;
  }

  public onDelete(number: number) {
    this.mutation(
      () => this.service.delete(number),
      () => this.load(0)
    );
  }

  public onCreate(toCreate: ProfileCreationEvent): void {
    this.mutation(
      () => this.service.create(toCreate),
      () => this.load(0)
    );
  }

  public onUpdate(toUpdate: MemberProfile): void {
    this.mutation(
      () => this.service.update(toUpdate),
      () => this.load(this.data.page)
    );
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load(1);
  }

  // DATA LOADING

  public load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  // PRIVATE METHODS

  private mutation(
    action: () => Observable<any>,
    onSuccess: () => void = () => { }
  ) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.creating = false;
          this.editing = false;

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

  private loadContactMethodSelection(): void {
    this.loading = true;

    this.memberProfileMethodService.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.contactMethodSelection = response);
  }

}
