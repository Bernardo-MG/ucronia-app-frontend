import { Component, inject, input, output, ViewChild } from '@angular/core';
import { Contact } from '@app/domain/contact/contact';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'assoc-contact-list',
  imports: [ButtonModule, TableModule, MenuModule],
  templateUrl: './contact-list.html'
})
export class ContactList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly contacts = input<Contact[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<Contact>();
  public readonly edit = output<Contact>();
  public readonly delete = output<number>();
  public readonly changeDirection = output<{ field: string, order: number }>();
  public readonly changePage = output<number>();

  @ViewChild('editionMenu') editionMenu!: Menu;

  public editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onEdit(event: Event, contact: Contact) {
    this.editionMenuItems = [];
    this.editionMenuItems.push({
      label: 'Editar',
      command: () => this.edit.emit(contact)
    });
    
    // Show menu
    this.editionMenu.toggle(event);
  }

  public onDelete(event: Event, contact: Contact) {
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