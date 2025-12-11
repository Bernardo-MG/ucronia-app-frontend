import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactCreation } from '@app/association/contacts/domain/contact-creation';
import { MemberContactCreation } from '@app/association/contacts/domain/member-contact-creation';
import { MemberContact } from '@app/association/members/domain/member-contact';
import { MemberContactDetails } from '@app/association/members/member-contact-details/member-contact-details';
import { MemberStatus } from '@app/domain/contact/active';
import { Contact } from '@app/domain/contact/contact';
import { TextFilter } from '@app/shared/data/text-filter/text-filter';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { finalize, Observable, throwError } from 'rxjs';
import { MemberStatusSelector } from '../../../shared/contact/components/member-status-selector/member-status-selector';
import { ContactCreationForm } from '../contact-creation-form/contact-creation-form';
import { ContactEditionForm } from '../contact-edition-form/contact-edition-form';
import { ContactInfo } from '../contact-info/contact-info';
import { ContactList } from '../contact-list/contact-list';
import { ContactStatusSelector } from '../contact-status-selector/contact-status-selector';
import { ContactsService } from '../contacts-service';
import { MemberContactCreationForm } from '../member-contact-creation-form/member-contact-creation-form';
import { MemberContactList } from '../member-contact-list/member-contact-list';
import { MemberContactsService } from '../member-contacts-service';
import { MembershipEvolutionChartComponent } from '../membership-evolution-chart/membership-evolution-chart.component';

@Component({
  selector: 'assoc-contact-view',
  imports: [FormsModule, PanelModule, ButtonModule, DialogModule, ToggleSwitchModule, CardModule, TextFilter, ContactCreationForm, MemberContactCreationForm, ContactEditionForm, ContactInfo, MemberContactDetails, MembershipEvolutionChartComponent, ContactList, MemberContactList, ContactStatusSelector, MemberStatusSelector],
  templateUrl: './contact-view.html'
})
export class ContactView implements OnInit {

  private readonly service = inject(ContactsService);
  private readonly memberContactsService = inject(MemberContactsService);
  private readonly messageService = inject(MessageService);

  public activeFilter = MemberStatus.All;

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public data = new PaginatedResponse<Contact | MemberContact>();

  public get memberData() {
    return this.data as PaginatedResponse<MemberContact>;
  }

  public nameFilter = '';

  public selectedData: Contact | MemberContact = new Contact();

  public get selectedMemberData() {
    return this.selectedData as MemberContact;
  }

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;
  public editing = false;
  public creating = false;
  public saving = false;
  public showing = false;

  public failures = new FailureStore();

  public modalTitle = '';

  public selectedStatus: 'all' | 'members' | 'guests' | 'sponsors' = 'all';

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("contact", "create");
    this.editable = authContainer.hasPermission("contact", "update");
    this.deletable = authContainer.hasPermission("contact", "delete");
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public onEdit(contact: MemberContact | Contact) {
    this.selectedData = contact;
    this.editing = true;
  }

  public onChangeActiveFilter(active: MemberStatus) {
    this.activeFilter = active;
    this.load(0);
  }

  public onChangeDirection(sorting: { field: string, order: number }) {
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

    this.load(this.data.page);
  }

  public onShowInfo(contact: Contact) {
    this.getService().getOne(contact.number)
      .subscribe(contact => this.selectedData = contact);
    this.showing = true;
  }

  public onNameFilterChange(): void {
    this.load(0);
  }

  public onCreate(toCreate: ContactCreation | MemberContactCreation): void {
    this.call(
      () => this.getService().create(toCreate as any),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onUpdate(toUpdate: Contact): void {
    this.call(
      () => this.service.patch(toUpdate),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onDelete(number: number) {
    this.call(
      () => this.service.delete(number),
      () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
    );
  }

  public onChangeStatusFilter(status: 'all' | 'members' | 'guests' | 'sponsors') {
    this.selectedStatus = status;
    this.load(0);
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

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load(1);
  }

  public load(page: number) {
    this.loading = true;

    this.getService().getAll(page, this.sort, this.activeFilter, this.nameFilter)
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
          this.editing = false;
          this.creating = false;
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

  private getService() {
    let service;
    if (this.selectedStatus === 'members') {
      service = this.memberContactsService;
    } else {
      service = this.service;
    }
    return service;
  }

}