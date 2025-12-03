import { Component, input, output } from '@angular/core';
import { Contact } from '@app/domain/contact/contact';
import { PaginatedResponse } from '@bernardo-mg/request';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'assoc-contact-list',
  imports: [ButtonModule, TableModule],
  templateUrl: './contact-list.html'
})
export class ContactList {

  public readonly data = input(new PaginatedResponse<Contact>());
  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);

  public readonly show = output<Contact>();
  public readonly edit = output<{ event: Event, contact: Contact }>();
  public readonly delete = output<{ event: Event, contact: number }>();
  public readonly changeDirection = output<{ field: string, order: number }>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.data().page - 1) * this.data().size;
  }

}