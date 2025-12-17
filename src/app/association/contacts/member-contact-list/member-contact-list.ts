import { Component, inject, input, output, ViewChild } from '@angular/core';
import { MemberStatusTag } from '@app/shared/contact/member-status-tag/member-status-tag';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { Contact, MemberContact } from "@ucronia/domain";
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule, TablePageEvent } from 'primeng/table';

@Component({
  selector: 'assoc-member-contact-list',
  imports: [ButtonModule, TableModule, MenuModule, MemberStatusTag],
  templateUrl: './member-contact-list.html'
})
export class MemberContactList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly contacts = input<MemberContact[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<MemberContact>();
  public readonly edit = output<MemberContact>();
  public readonly delete = output<number>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  @ViewChild('editionMenu') editionMenu!: Menu;
  public editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

  public showEdit(event: Event, contact: MemberContact) {
    this.editionMenuItems = [];
    this.editionMenuItems.push({
      label: 'Editar',
      command: () => this.edit.emit(contact)
    });
    
    // Show menu
    this.editionMenu.toggle(event);
  }

  public confirmDelete(event: Event, contact: Contact) {
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
      accept: () => this.delete.emit(contact.number)
    });
  }

}