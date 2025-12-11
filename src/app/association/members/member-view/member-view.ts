import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactCreation } from '@app/association/contacts/domain/contact-creation';
import { MemberContactCreation } from '@app/association/contacts/domain/member-contact-creation';
import { MemberStatus } from '@app/domain/contact/active';
import { MemberContact } from '@app/association/members/domain/member-contact';
import { Member } from '@app/domain/members/member';
import { MemberStatusSelector } from '@app/shared/contact/components/member-status-selector/member-status-selector';
import { TextFilter } from '@app/shared/data/text-filter/text-filter';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Menu } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TablePageEvent } from 'primeng/table';
import { finalize, Observable, Subject, throwError } from 'rxjs';
import { MemberPatch } from '../domain/member-patch';
import { MemberContactDetails } from '../member-contact-details/member-contact-details';
import { MemberContactCreationForm } from '../member-creation-form/member-creation-form';
import { MemberList } from '../member-list/member-list';
import { MemberService } from '../member-service';

@Component({
  selector: 'assoc-member-view',
  imports: [FormsModule, PanelModule, DialogModule, CardModule, ButtonModule, MemberList, TextFilter, MemberContactDetails, MemberContactCreationForm, MemberStatusSelector],
  templateUrl: './member-view.html'
})
export class MemberView implements OnInit {

  private readonly service = inject(MemberService);
  private readonly messageService = inject(MessageService);

  @ViewChild('editionMenu') editionMenu!: Menu;

  public editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public data = new PaginatedResponse<Member>();

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
  public editing = false;
  public saving = false;

  public view = '';

  public failures = new FailureStore();

  public activeFilter = MemberStatus.Active;
  public nameFilterSubject = new Subject<string>();
  public nameFilter = '';

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("contact", "create");
    this.deletable = authContainer.hasPermission("contact", "delete");
    this.editable = authContainer.hasPermission("contact", "update");
    this.readContact = authContainer.hasPermission("contact", "read");
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
    this.selectedData = member;
    this.loading = true;
    this.service.getContact(member.number)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        this.memberContact = {
          ...response,
          active: member.active,
          renew: member.renew
        };
      });
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

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  public onDelete(number: number) {
    this.call(
      () => this.service.delete(number),
      () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
    );
  }

  public onCreate(toCreate: ContactCreation | MemberContactCreation): void {
    this.call(
      () => this.service.create(toCreate as any),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load(1);
  }

  public setActive(number: number, status: boolean) {
    const patched: MemberPatch = {
      number,
      active: status,
      renew: status
    }
    this.call(
      () => this.service.patch(patched),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public setRenewal(number: number, status: boolean) {
    const patched: MemberPatch = {
      number,
      renew: status
    }
    this.call(
      () => this.service.patch(patched),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter)
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
