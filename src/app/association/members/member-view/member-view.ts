import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberContactDetails } from '@app/association/contacts/member-contact-details/member-contact-details';
import { ContactCreationForm } from '@app/shared/contact/contact-creation-form/contact-creation-form';
import { MemberStatusSelector } from '@app/shared/contact/member-status-selector/member-status-selector';
import { TextFilter } from '@app/shared/data/text-filter/text-filter';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ContactCreation, MemberContactCreation } from '@ucronia/api';
import { ContactMethod, Member, MemberContact, MemberStatus } from "@ucronia/domain";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { TablePageEvent } from 'primeng/table';
import { finalize, Observable, Subject, tap, throwError } from 'rxjs';
import { MemberEditionForm } from '../member-edition-form/member-edition-form';
import { MemberList } from '../member-list/member-list';
import { MemberService } from '../member-service';

@Component({
  selector: 'assoc-member-view',
  imports: [FormsModule, PanelModule, DialogModule, CardModule, ButtonModule, MemberList, TextFilter, MemberContactDetails, ContactCreationForm, MemberStatusSelector, MemberEditionForm],
  templateUrl: './member-view.html'
})
export class MemberView implements OnInit {

  private readonly service = inject(MemberService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Member>();
  public contactMethodSelection: ContactMethod[] = [];

  public selectedData = new Member();
  public memberContact = new MemberContact();

  private sort = new Sorting();

  public readonly readContact;
  public readonly createable;
  public readonly deletable;
  public readonly editable;

  /**
   * Loading flag.
   */
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
    this.createable = authService.hasPermission("contact", "create");
    this.deletable = authService.hasPermission("contact", "delete");
    this.editable = authService.hasPermission("contact", "update");
    this.readContact = authService.hasPermission("contact", "read");
  }

  public ngOnInit(): void {
    this.load(0);
    this.loadContactMethodSelection();
  }

  public loadContactMethodSelection(): void {
    this.loading = true;

    this.service.getAllContactMethods()
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.contactMethodSelection = response);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
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
      () => this.service.delete(number)
        .pipe(
          tap(() => {
            this.load(0);
          })
        )
    );
  }

  public onCreate(toCreate: ContactCreation | MemberContactCreation): void {
    this.mutation(
      () => this.service.create(toCreate as any)
        .pipe(
          tap(() => {
            this.load(0);
          })
        )
    );
  }

  public onUpdate(toUpdate: MemberContact): void {
    this.mutation(
      () => this.service.patch(toUpdate)
        .pipe(
          tap(() => {
            this.load(this.data.page);
          })
        )
    );
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load(1);
  }

  public load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  private mutation(action: () => Observable<any>) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.creating = false;
          this.editing = false;
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
