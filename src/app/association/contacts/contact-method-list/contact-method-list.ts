import { Component, inject, input, output, ViewChild } from '@angular/core';
import { ContactMethod } from "@ucronia/domain";
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'assoc-contact-method-list',
  imports: [ButtonModule, TableModule, MenuModule],
  templateUrl: './contact-method-list.html'
})
export class ContactMethodList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly data = input<ContactMethod[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);
  
  public readonly edit = output<ContactMethod>();
  public readonly delete = output<number>();
  public readonly changePage = output<number>();

  @ViewChild('editionMenu') editionMenu!: Menu;
  public editionMenuItems: MenuItem[] = [];

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onDelete(event: Event, contact: ContactMethod) {
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
