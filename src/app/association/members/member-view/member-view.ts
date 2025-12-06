import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactCreation } from '@app/association/contacts/domain/contact-creation';
import { MemberContactCreation } from '@app/association/contacts/domain/member-contact-creation';
import { MemberContact } from '@app/domain/contact/member-contact';
import { Member } from '@app/domain/members/member';
import { TextFilter } from '@app/shared/data/text-filter/text-filter';
import { AuthContainer } from '@bernardo-mg/authentication';
import { FailureResponse, FailureStore, PaginatedResponse, Sorting, SortingDirection, SortingProperty } from '@bernardo-mg/request';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule, TablePageEvent } from 'primeng/table';
import { finalize, Observable, Subject, throwError } from 'rxjs';
import { MemberPatch } from '../domain/member-patch';
import { MemberContactDetails } from '../member-contact-details/member-contact-details';
import { MemberContactCreationForm } from '../member-creation-form/member-creation-form';
import { MemberService } from '../member-service';

@Component({
  selector: 'assoc-member-view',
  imports: [FormsModule, PanelModule, TableModule, DialogModule, CardModule, ButtonModule, MenuModule, TextFilter, MemberContactDetails, MemberContactCreationForm],
  templateUrl: './member-view.html'
})
export class MemberView implements OnInit {

  private readonly service = inject(MemberService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

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
      .subscribe(response => this.memberContact = response);
    this.showing = true;
  }

  public onStartEditingView(view: string): void {
    this.view = view;
    this.editing = true;
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

  public openEditionMenu(event: Event, member: Member) {
    this.selectedData = member;

    // Rebuild menu items dynamically
    this.editionMenuItems = [];

    // Determine current membership values
    const isActive = !!this.selectedData.active;
    const canRenew = !!this.selectedData.renew;

    // Active/Deactivate toggle
    this.editionMenuItems.push({
      label: isActive ? 'Desactivar' : 'Activar',
      command: (method) => this.onConfirmSetActive(method.originalEvent as Event, !isActive)
    });

    // Renewal toggle
    this.editionMenuItems.push({
      label: canRenew ? 'Desactivar renovación' : 'Activar renovación',
      command: (method) => this.onConfirmSetRenewal(method.originalEvent as Event, !canRenew)
    });

    // Show menu
    this.editionMenu.toggle(event);
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
        this.setActive(status);
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
        this.setRenewal(status);
      }
    });
  }

  private setActive(status: boolean) {
    this.selectedData.active = status;
    this.selectedData.renew = status;
    this.call(
      () => this.service.patch(this.selectedData),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
    );
  }

  private setRenewal(status: boolean) {
    const patched: MemberPatch = {
      number: this.selectedData.number,
      renew: status
    }
    this.call(
      () => this.service.patch(patched),
      () => this.messageService.add({ severity: 'info', summary: 'Actualizado', detail: 'Datos actualizados', life: 3000 })
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
