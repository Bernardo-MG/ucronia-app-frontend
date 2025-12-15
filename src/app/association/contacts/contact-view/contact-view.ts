import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactCreationForm } from '@app/shared/contact/contact-creation-form/contact-creation-form';
import { MemberStatusSelector } from '@app/shared/contact/member-status-selector/member-status-selector';
import { TextFilter } from '@app/shared/data/text-filter/text-filter';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ContactCreation, MemberContactCreation } from '@ucronia/api';
import { Contact, ContactMethod, MemberContact, MemberStatus } from "@ucronia/domain";
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ContactPatch } from 'projects/ucronia/api/src/lib/contacts/contact-patch';
import { finalize, Observable, tap, throwError } from 'rxjs';
import { ContactEditionForm } from '../contact-edition-form/contact-edition-form';
import { ContactList } from '../contact-list/contact-list';
import { ContactMethodForm } from '../contact-method-form/contact-method-form';
import { ContactMethodList } from '../contact-method-list/contact-method-list';
import { ContactMethodService } from '../contact-method-service';
import { ContactStatusSelector } from '../contact-status-selector/contact-status-selector';
import { ContactsService } from '../contacts-service';
import { MemberContactDetails } from '../member-contact-details/member-contact-details';
import { MemberContactList } from '../member-contact-list/member-contact-list';
import { MemberContactsService } from '../member-contacts-service';
import { MembershipEvolutionChartComponent } from '../membership-evolution-chart/membership-evolution-chart.component';

@Component({
  selector: 'assoc-contact-view',
  imports: [FormsModule, PanelModule, ButtonModule, DialogModule, ToggleSwitchModule, CardModule, TextFilter, ContactCreationForm, ContactEditionForm, MemberContactDetails, MembershipEvolutionChartComponent, ContactList, MemberContactList, ContactStatusSelector, MemberStatusSelector, ContactMethodList, ContactMethodForm],
  templateUrl: './contact-view.html'
})
export class ContactView implements OnInit {

  private readonly service = inject(ContactsService);
  private readonly memberContactsService = inject(MemberContactsService);
  private readonly contactMethodService = inject(ContactMethodService);
  private readonly messageService = inject(MessageService);

  public activeFilter = MemberStatus.All;

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public data = new PaginatedResponse<Contact | MemberContact>();

  public get memberData() {
    return this.data as PaginatedResponse<MemberContact>;
  }

  public contactMethodData = new PaginatedResponse<ContactMethod>();

  public nameFilter = '';

  public selectedData: Contact | MemberContact = new Contact();
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

  public selectedStatus: 'all' | 'members' | 'guests' | 'sponsors' = 'all';

  constructor() {
    const authService = inject(AuthService);

    // Check permissions
    this.createable = authService.hasPermission("contact", "create");
    this.editable = authService.hasPermission("contact", "update");
    this.deletable = authService.hasPermission("contact", "delete");
  }

  public ngOnInit(): void {
    this.load(0);
    this.loadContactMethods(0);
  }

  public onShowEdit(contact: MemberContact | Contact) {
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
      () => this.service.create(toCreate as any)
        .pipe(
          tap(() => {
            this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 });
            this.load(0);
          })
        )
    );
  }

  public onUpdate(toUpdate: ContactPatch): void {
    this.call(
      () => this.service.patch(toUpdate)
        .pipe(
          tap(() => {
            this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 });
            this.load(this.data.page);
          })
        )
    );
  }

  public onDelete(number: number) {
    this.call(
      () => this.service.delete(number)
        .pipe(
          tap(() => {
            this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
            this.load(0);
          })
        )
    );
  }

  public onShowEditContactMethod(contactMethod: ContactMethod) {
    this.selectedContactMethodData = contactMethod;
    this.editingMethod = true;
  }

  public onCreateContactMethod(toCreate: ContactMethod): void {
    this.call(
      () => this.contactMethodService.create(toCreate)
        .pipe(
          tap(() => {
            this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 });
            this.loadContactMethods(0);
          })
        )
    );
  }

  public onUpdateContactMethod(toUpdate: ContactMethod): void {
    this.call(
      () => this.contactMethodService.update(toUpdate)
        .pipe(
          tap(() => {
            this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 });
            this.loadContactMethods(this.data.page);
          })
        )
    );
  }

  public onDeleteContactMethod(number: number): void {
    this.call(
      () => this.contactMethodService.delete(number)
        .pipe(
          tap(() => {
            this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 });
            this.loadContactMethods(0);
          })
        )
    );
  }

  public loadContactMethods(page: number): void {
    this.loading = true;

    this.contactMethodService.getAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.contactMethodData = response);
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

  private call(action: () => Observable<any>) {
    this.loading = true;
    action()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.failures.clear();
          this.editing = false;
          this.creating = false;
          this.creatingMethod = false;
          this.editingMethod = false;
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