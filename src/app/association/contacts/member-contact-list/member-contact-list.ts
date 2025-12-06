import { Component, inject, input, output } from '@angular/core';
import { Contact } from '@app/domain/contact/contact';
import { MemberContact } from '@app/domain/contact/member-contact';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'assoc-member-contact-list',
  imports: [ButtonModule, TableModule, TagModule],
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
  public readonly edit = output<{ event: Event, contact: MemberContact }>();
  public readonly delete = output<number>();
  public readonly changeDirection = output<{ field: string, order: number }>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(first: number) {
    const page = (first / this.rows()) + 1;
    this.changePage.emit(page);
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