import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Active } from '@app/domain/contact/active';
import { Contact } from '@app/domain/contact/contact';
import { ContactCreation } from '@app/domain/contact/contact-creation';
import { MemberContact } from '@app/domain/contact/member-contact';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { JustifyCenterDirective } from '@bernardo-mg/ui';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { debounceTime, finalize, Observable, Subject, throwError } from 'rxjs';
import { ContactEditionForm } from '../contact-edition-form/contact-edition-form';
import { MemberContactCreationForm } from '../member-contact-creation-form/member-contact-creation-form';
import { MemberContactInfo } from '../member-contact-info/member-contact-info';
import { MemberStatusSelect } from '../member-status-select/member-status-select';
import { MemberContacsService } from '../member-contacts-service';
import { MembershipEvolutionChartComponent } from '../membership-evolution-chart/membership-evolution-chart.component';

@Component({
  selector: 'assoc-member-contact-list',
  imports: [FormsModule, PanelModule, MenuModule, ButtonModule, DialogModule, TableModule, BadgeModule, MemberStatusSelect, MemberContactCreationForm, ContactEditionForm, MemberContactInfo, MembershipEvolutionChartComponent, JustifyCenterDirective],
  templateUrl: './member-contact-list.html'
})
export class MemberContactList implements OnInit {

  private readonly service = inject(MemberContacsService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  @ViewChild('contactEditionMenu') contactEditionMenu!: Menu;

  public get first() {
    return (this.data.page - 1) * this.data.size;
  }

  public activeFilter = Active.Active;

  public readonly createable;
  public readonly editable;
  public readonly deletable;

  public data = new PaginatedResponse<MemberContact>();

  public nameFilter = '';

  public nameFilterSubject = new Subject<string>();

  public selectedData = new MemberContact();

  private sort = new Sorting();

  /**
   * Loading flag.
   */
  public loading = false;
  public editing = false;
  public saving = false;
  public showing = false;

  public view: string = '';

  public failures = new FailureStore();

  public contactEditionMenuItems: MenuItem[] = [];

  public modalTitle = '';

  constructor() {
    const authContainer = inject(AuthContainer);

    // Check permissions
    this.createable = authContainer.hasPermission("contact", "create");
    this.editable = authContainer.hasPermission("contact", "update");
    this.deletable = authContainer.hasPermission("contact", "delete");

    this.nameFilterSubject
      .pipe(debounceTime(300))
      .subscribe(() => this.load(0));
  }

  public ngOnInit(): void {
    this.load(0);
  }

  public openEditionMenu(event: Event, contact: MemberContact) {
    this.selectedData = contact;

    // Rebuild menu items dynamically
    this.contactEditionMenuItems = [];

    // Edit option is always available
    this.contactEditionMenuItems.push({
      label: 'Editar',
      command: () => this.onStartEditingView('edition')
    });

    // Determine current membership values (default to active=true, renew=true if undefined)
    const isActive = !!this.selectedData.active;
    const canRenew = !!this.selectedData.renew;

    // Active/Deactivate toggle
    this.contactEditionMenuItems.push({
      label: isActive ? 'Desactivar' : 'Activar',
      command: (method) => this.onConfirmSetActive(method.originalEvent as Event, !isActive)
    });

    // Renewal toggle
    this.contactEditionMenuItems.push({
      label: canRenew ? 'Desactivar renovación' : 'Activar renovación',
      command: (method) => this.onConfirmSetRenewal(method.originalEvent as Event, !canRenew)
    });

    // Show menu
    this.contactEditionMenu.toggle(event);
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

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / this.data.size) + 1;
    this.load(page);
  }

  public onNameFilterChange(): void {
    this.load(0);
  }

  public onConfirmSetActive(event: Event, status: boolean) {
    let message;
    if (status) {
      message = '¿Estás seguro de querer activar el usuario?';
    } else {
      message = '¿Estás seguro de querer desactivar el usuario?';
    }
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message,
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
      accept: () => {
        this.onSetActive(status);
      }
    });
  }

  public onConfirmSetRenewal(event: Event, status: boolean) {
    let message;
    if (status) {
      message = '¿Estás seguro de querer activar la renovación del usuario?';
    } else {
      message = '¿Estás seguro de querer desactivar la renovación del usuario?';
    }
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message,
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
      accept: () => {
        this.onSetRenewal(status);
      }
    });
  }

  public onSetActive(status: boolean) {
    this.selectedData.active = status;
    this.selectedData.renew = status;
    this.call(
      () => this.service.patch(this.selectedData),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onSetRenewal(status: boolean) {
    this.selectedData.renew = status;
    this.call(
      () => this.service.patch(this.selectedData),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  public onCreate(toCreate: ContactCreation): void {
    this.call(
      () => this.service.create(toCreate),
      () => this.messageService.add({ severity: 'info', summary: 'Creado', detail: 'Datos creados', life: 3000 })
    );
  }

  public onUpdate(toUpdate: MemberContact): void {
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

  private load(page: number) {
    this.loading = true;

    this.service.getAll(page, this.sort, this.activeFilter, this.nameFilter)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => this.data = response);
  }

}