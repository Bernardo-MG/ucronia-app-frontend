import { Component, inject, OnInit } from '@angular/core';
import { MemberContact } from '@app/domain/contact/member-contact';
import { Member } from '@app/domain/members/member';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, throwError } from 'rxjs';
import { MemberContactDetails } from '../member-contact-details/member-contact-details';
import { MemberContactCreationForm } from '../member-creation-form/member-creation-form';
import { MemberService } from '../member-service';
import { ContactCreation } from '@app/association/contacts/domain/contact-creation';
import { MemberContactCreation } from '@app/association/contacts/domain/member-contact-creation';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'assoc-member-listing',
  imports: [PanelModule, TableModule, DialogModule, ButtonModule, MemberContactDetails, MemberContactCreationForm],
  templateUrl: './member-listing.html'
})
export class MemberListing implements OnInit {

  private readonly service = inject(MemberService);
  private readonly messageService = inject(MessageService);

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Member>();

  public selectedData = new Member();

  public memberContact = new MemberContact();

  private sort = new Sorting();

  public readonly readContact;
  public readonly createable;

  /**
   * Loading flag.
   */
  public loading = false;
  public showing = false;
  public editing = false;
  public saving = false;

  public view = '';

  public failures = new FailureStore();

  constructor() {
    const authContainer = inject(AuthContainer);
    
    // Check permissions
    this.readContact = authContainer.hasPermission("member_contact", "read");
    this.createable = authContainer.hasPermission("member", "create");
  }

  public ngOnInit(): void {
    this.load(0);
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
    this.loading = true;
    this.service.getContact(member.number)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.memberContact = response);
    this.showing = true;
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  public onCreate(toCreate: ContactCreation | MemberContactCreation): void {
    this.call(
      () => this.service.create(toCreate as any),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

  private call(action: () => Observable<any>, onSuccess: () => void = () => { }) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.view = 'none';
          this.load(this.data.page);
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
