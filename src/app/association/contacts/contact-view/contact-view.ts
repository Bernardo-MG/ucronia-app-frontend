import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactCreationEvent, ContactCreationForm } from '@app/shared/contact/contact-creation-form/contact-creation-form';
import { MemberStatusSelector } from '@app/shared/contact/member-status-selector/member-status-selector';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { AuthService } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { TextFilter } from '@bernardo-mg/ui';
import { Contact, ContactMethod, Guest, Member, MemberContact, MemberStatus, Sponsor } from "@ucronia/domain";
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { finalize, forkJoin, Observable, throwError } from 'rxjs';
import { ContactEditionForm } from '../contact-edition-form/contact-edition-form';
import { ContactList } from '../contact-list/contact-list';
import { ContactMethodForm } from '../contact-method-form/contact-method-form';
import { ContactMethodList } from '../contact-method-list/contact-method-list';
import { ContactMethodService } from '../contact-method-service';
import { ContactStatusSelector } from '../contact-status-selector/contact-status-selector';
import { ContactsService } from '../contacts-service';
import { GuestsService } from '../guests-service';
import { MemberContactDetails } from '../member-contact-details/member-contact-details';
import { MemberContactList } from '../member-contact-list/member-contact-list';
import { MemberContactsService } from '../member-contacts-service';
import { MembershipEvolutionChartComponent } from '../membership-evolution-chart/membership-evolution-chart.component';
import { SponsorsService } from '../sponsors-service';
import { ContactInfo } from '../model/contact-info';

@Component({
  selector: 'assoc-contact-view',
  imports: [FormsModule, PanelModule, ButtonModule, DialogModule, ToggleSwitchModule, CardModule, TextFilter, ContactCreationForm, ContactEditionForm, MemberContactDetails, MembershipEvolutionChartComponent, ContactList, MemberContactList, ContactStatusSelector, MemberStatusSelector, ContactMethodList, ContactMethodForm],
  templateUrl: './contact-view.html'
})
export class ContactView implements OnInit {

  private readonly service = inject(ContactsService);
  private readonly memberContactsService = inject(MemberContactsService);
  private readonly sponsorContactsService = inject(SponsorsService);
  private readonly guestContactsService = inject(GuestsService);
  private readonly contactMethodService = inject(ContactMethodService);

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public contacts = new PaginatedResponse<Contact>();
  public members = new PaginatedResponse<MemberContact>();

  public contactMethodData = new PaginatedResponse<ContactMethod>();
  public contactMethodSelection: ContactMethod[] = [];

  public activeFilter = MemberStatus.All;
  public nameFilter = '';

  public selectedData = new ContactInfo();
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
    this.loading = true;
    forkJoin({
      data: this.service.getAll(undefined, this.sort, this.activeFilter, this.nameFilter),
      contactMethodSelection: this.contactMethodService.getAllAvailable(),
      contactMethods: this.contactMethodService.getAll()
    })
      .pipe(finalize(() => this.loading = false))
      .subscribe(({ data, contactMethodSelection, contactMethods }) => {
        this.contacts = data;
        this.contactMethodSelection = contactMethodSelection;
        this.contactMethodData = contactMethods;
      });
  }

  // EVENT HANDLERS

  public onShowEdit(contact: MemberContact | Contact) {
    this.selectedData = contact;
    this.editing = true;
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

  public onShowInfo(contact: Contact) {
    if (this.selectedStatus === 'all') {
      this.service.getOne(contact.number)
        .pipe(finalize(() => this.showing = true))
        .subscribe((contact: ContactInfo) => this.selectedData = contact);
    } else if (this.selectedStatus === 'members') {
      this.memberContactsService.getOne(contact.number)
        .pipe(finalize(() => this.showing = true))
        .subscribe((contact: ContactInfo) => this.selectedData = contact);
    }
  }

  public onNameFilterChange(): void {
    this.load();
  }

  public onCreate(toCreate: ContactCreationEvent): void {
    this.mutation(
      () => this.service.create(toCreate as any),
      () => this.load()
    );
  }

  public onUpdate(toUpdate: Contact): void {
    this.mutation(
      () => this.service.update(toUpdate),
      () => this.load(this.currentPage())
    );
  }

  public onDelete(number: number) {
    this.mutation(
      () => this.service.delete(number),
      () => this.load()
    );
  }

  public onShowEditContactMethod(contactMethod: ContactMethod) {
    this.selectedContactMethodData = contactMethod;
    this.editingMethod = true;
  }

  public onCreateContactMethod(toCreate: ContactMethod): void {
    this.mutation(
      () => this.contactMethodService.create(toCreate),
      () => this.loadContactMethods(0)
    );
  }

  public onUpdateContactMethod(toUpdate: ContactMethod): void {
    this.mutation(
      () => this.contactMethodService.update(toUpdate),
      () => this.loadContactMethods(this.currentPage())
    );
  }

  public onDeleteContactMethod(number: number): void {
    this.mutation(
      () => this.contactMethodService.delete(number),
      () => this.loadContactMethods(0)
    );
  }

  public onChangeStatusFilter(status: 'all' | 'members' | 'guests' | 'sponsors') {
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

    if (this.selectedStatus === 'all') {
      this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter)
        .pipe(finalize(() => this.loading = false))
        .subscribe(response => this.contacts = response);
    } else if (this.selectedStatus === 'members') {
      this.memberContactsService.getAll(page, this.sort, this.activeFilter, this.nameFilter)
        .pipe(finalize(() => this.loading = false))
        .subscribe(response => this.members = response);
    }
  }

  public loadContactMethods(page: number): void {
    this.loading = true;

    this.contactMethodService.getAll(page)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.contactMethodData = response);
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
    let page = 0;
    if (this.selectedStatus === 'all') {
      page = this.contacts.page;
    } else if (this.selectedStatus === 'members') {
      page = this.members.page;
    }

    return page;
  }

}