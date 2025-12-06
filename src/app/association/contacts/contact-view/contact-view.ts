import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactCreation } from '@app/association/contacts/domain/contact-creation';
import { MemberContactCreation } from '@app/association/contacts/domain/member-contact-creation';
import { Active } from '@app/domain/contact/active';
import { Contact } from '@app/domain/contact/contact';
import { MemberContact } from '@app/domain/contact/member-contact';
import { TextFilter } from '@app/shared/data/text-filter/text-filter';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { finalize, Observable, throwError } from 'rxjs';
import { ContactCreationForm } from '../contact-creation-form/contact-creation-form';
import { ContactEditionForm } from '../contact-edition-form/contact-edition-form';
import { ContactInfo } from '../contact-info/contact-info';
import { ContactList } from '../contact-list/contact-list';
import { ContactsService } from '../contacts-service';
import { MemberContactCreationForm } from '../member-contact-creation-form/member-contact-creation-form';
import { MemberContactInfo } from '../member-contact-info/member-contact-info';
import { MemberContactList } from '../member-contact-list/member-contact-list';
import { MemberContactsService } from '../member-contacts-service';
import { MembershipEvolutionChartComponent } from '../membership-evolution-chart/membership-evolution-chart.component';

@Component({
  selector: 'assoc-contact-view',
  imports: [FormsModule, PanelModule, MenuModule, ButtonModule, DialogModule, TableModule, ToggleSwitchModule, CardModule, SelectButtonModule, TextFilter, ContactCreationForm, MemberContactCreationForm, ContactEditionForm, ContactInfo, MemberContactInfo, MembershipEvolutionChartComponent, ContactList, MemberContactList],
  templateUrl: './contact-view.html'
})
export class ContactView implements OnInit {

  private readonly service = inject(ContactsService);
  private readonly memberContactsService = inject(MemberContactsService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  @ViewChild('editionMenu') editionMenu!: Menu;

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public activeFilter = Active.Active;

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
  public saving = false;
  public showing = false;

  public view = '';

  public failures = new FailureStore();

  public editionMenuItems: MenuItem[] = [];

  public modalTitle = '';

  public statusOptions: any[] = [{ label: 'Todos', value: 'all' }, { label: 'Socios', value: 'members' }, { label: 'Invitados', value: 'guests' }, { label: 'Esponsors', value: 'sponsors' }];
  public selectedStatus: 'all' | 'members' | 'guests' | 'sponsors' = 'all';

  public memberStatusOptions: any[] = [{ label: 'Todos', value: 'all' }, { label: 'Activos', value: 'active' }, { label: 'Baja', value: 'inactive' }];
  public selectedMemberStatus: 'all' | 'active' | 'inactive' = 'all';

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("contact", "create");
    this.editable = authContainer.hasPermission("contact", "update");
    this.deletable = authContainer.hasPermission("contact", "delete");

    this.editionMenuItems.push({
      label: 'Editar',
      command: () => this.onStartEditingView('edition')
    });
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public openEditionMenu(event: Event, contact: Contact) {
    this.selectedData = contact;

    // Show menu
    this.editionMenu.toggle(event);
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
  }

  public onChangeActiveFilter(active: Active) {
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
    this.service.getOne(contact.number)
      .subscribe(fee => this.selectedData = fee);
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

  public onDelete(event: Event, number: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () =>
        this.call(
          () => this.service.delete(number),
          () => this.messageService.add({ severity: 'info', summary: 'Borrado', detail: 'Datos borrados', life: 3000 })
        )
    });
  }

  public onChangeStatusFilter(event: SelectButtonChangeEvent) {
    this.selectedStatus = event.value as 'all' | 'members' | 'guests' | 'sponsors';
    this.load(0);
  }

  public onChangeMemberStatus(event: SelectButtonChangeEvent) {
    this.selectedMemberStatus = event.value as 'all' | 'active' | 'inactive';
    if (this.selectedMemberStatus === 'all') {
      this.activeFilter = Active.All;
    } else if (this.selectedMemberStatus === 'active') {
      this.activeFilter = Active.Active;
    } else if (this.selectedMemberStatus === 'inactive') {
      this.activeFilter = Active.Inactive;
    }
    this.load(0);
  }

  public onFilter(filter: string) {
    this.nameFilter = filter;
    this.load(1);
  }

  public load(page: number) {
    this.loading = true;

    if (this.selectedStatus === 'members') {
      this.memberContactsService.getAll(page, this.sort, this.activeFilter, this.nameFilter)
        .pipe(finalize(() => this.loading = false))
        .subscribe(response => this.data = response);
    } else {
      this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter)
        .pipe(finalize(() => this.loading = false))
        .subscribe(response => this.data = response);
    }
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